from sqlalchemy import Column, Integer, JSON

try:
    from .database import Base
except ImportError:
    from database import Base


class Tree(Base):
    __tablename__ = "trees"

    id = Column(Integer, primary_key=True, index=True)
    tree = Column(JSON, nullable=False)
