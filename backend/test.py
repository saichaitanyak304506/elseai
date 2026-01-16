import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine
from app import models

client = TestClient(app)



@pytest.fixture(scope="module", autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)



def register_user(username="testuser", password="test123"):
    return client.post(
        "/register",
        json={
            "username": username,
            "email": f"{username}@test.com",
            "password": password,
        },
    )


def login_user(username="testuser", password="test123"):
    return client.post(
        "/login",
        json={"username": username, "password": password},
    )


def auth_headers(token: str):
    return {"Authorization": f"Bearer {token}"}


# ---------------------------
# AUTH TESTS
# ---------------------------

def test_register_user():
    res = register_user()
    assert res.status_code == 200
    assert res.json()["message"] == "User registered successfully"


def test_register_duplicate_user():
    res = register_user()
    assert res.status_code == 400


def test_login_user():
    res = login_user()
    assert res.status_code == 200
    data = res.json()

    assert "access_token" in data
    assert "user_id" in data
    assert data["username"] == "testuser"


# ---------------------------
# ME / PROFILE
# ---------------------------

def test_get_me():
    login = login_user()
    token = login.json()["access_token"]

    res = client.get("/me", headers=auth_headers(token))
    assert res.status_code == 200
    assert res.json()["image_credits"] == 5


# ---------------------------
# CHAT TEST
# # ---------------------------

# def test_chat():
#     login = login_user()
#     token = login.json()["access_token"]

#     res = client.post(
#         "/chat",
#         json={"prompt": "Hello"},
#         headers=auth_headers(token),
#     )

#     assert res.status_code == 200
#     assert "response" in res.json()


# ---------------------------
# HISTORY TESTS
# ---------------------------

def test_get_history():
    login = login_user()
    user_id = login.json()["user_id"]

    res = client.get(f"/history/{user_id}")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_delete_history():
    login = login_user()
    token = login.json()["access_token"]
    user_id = login.json()["user_id"]

    history = client.get(f"/history/{user_id}").json()
    if not history:
        pytest.skip("No history to delete")

    history_id = history[0]["id"]

    res = client.delete(f"/history/{history_id}")
    assert res.status_code == 200


# ---------------------------
# IMAGE CREDIT LOGIC (NO REAL IMAGE)
# ---------------------------

# def test_image_credit_decrement(monkeypatch):
#     login = login_user()
#     token = login.json()["access_token"]

#     # mock image generator to avoid ClipDrop API
#     from app import image_gen

#     def fake_generate_image(prompt: str):
#         return "https://fake.image/url.png"

#     monkeypatch.setattr(image_gen, "generate_image", fake_generate_image)

#     res = client.post(
#         "/generate-image",
#         json={"prompt": "test image"},
#         headers=auth_headers(token),
#     )

#     assert res.status_code == 200
#     assert "image_url" in res.json()
#     assert res.json()["remaining_credits"] == 4
