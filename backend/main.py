from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import mysql.connector
import os

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "your_mysql_password",
    "database": "securitydb"
}

class Incident(BaseModel):
    id: int
    cameraId: int
    type: str
    tsStart: str
    tsEnd: str
    thumbnailUrl: str
    resolved: bool
    cameraName: str
    cameraLocation: str

@app.get("/api/incidents", response_model=List[Incident])
def get_incidents(resolved: bool = False):
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT i.*, c.name as cameraName, c.location as cameraLocation
        FROM incidents i
        JOIN cameras c ON i.cameraId = c.id
        WHERE i.resolved = %s
        ORDER BY i.tsStart DESC
    """, (resolved,))
    incidents = cursor.fetchall()
    cursor.close()
    conn.close()
    return incidents

@app.patch("/api/incidents/{incident_id}/resolve", response_model=Incident)
def resolve_incident(incident_id: int):
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("UPDATE incidents SET resolved = NOT resolved WHERE id = %s", (incident_id,))
    conn.commit()
    cursor.execute("""
        SELECT i.*, c.name as cameraName, c.location as cameraLocation
        FROM incidents i
        JOIN cameras c ON i.cameraId = c.id
        WHERE i.id = %s
    """, (incident_id,))
    incident = cursor.fetchone()
    cursor.close()
    conn.close()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident