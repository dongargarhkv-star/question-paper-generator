"""
auth.py

Authentication utilities:
- Password hashing
- Password verification
"""

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


def hash_password(password):
    """
    Generate a secure hash for a password.
    """
    return generate_password_hash(password)


def verify_password(password, hashed_password):
    """
    Verify a password against its hash.
    """
    return check_password_hash(hashed_password, password)
