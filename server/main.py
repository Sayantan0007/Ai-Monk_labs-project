from typing import Any

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

try:
    from .database import engine, Base, SessionLocal
    from . import models
except ImportError:
    from database import engine, Base, SessionLocal
    import models

app = FastAPI()

# Dependency


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TreePayload(BaseModel):
    tree: dict[str, Any] = Field(..., description="Nested tree JSON payload")


@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET all trees


@app.get("/trees")
def get_trees(db: Session = Depends(get_db)):
    return db.query(models.Tree).all()

# POST new tree


@app.post("/trees")
def create_tree(payload: TreePayload, db: Session = Depends(get_db)):
    new_tree = models.Tree(tree=payload.tree)
    db.add(new_tree)
    db.commit()
    db.refresh(new_tree)
    return new_tree

# PUT update tree


@app.put("/trees/{tree_id}")
def update_tree(tree_id: int, payload: TreePayload, db: Session = Depends(get_db)):
    db_tree = db.query(models.Tree).filter(models.Tree.id == tree_id).first()

    if not db_tree:
        raise HTTPException(status_code=404, detail="Tree not found")

    db_tree.tree = payload.tree
    db.commit()
    db.refresh(db_tree)
    return db_tree
