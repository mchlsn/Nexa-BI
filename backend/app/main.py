from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="NexaBI API",
    description="Backend API untuk platform NexaBI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    alow_headers=["*"],
)

@app.get("/")
def root():
    return {"Message": "NexaBI API is running"}