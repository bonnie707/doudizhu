"""Create the application's tables before starting a fresh demo deployment."""

import asyncio

from models.base import Base, engine
from models import auth  # noqa: F401 - registers the User and Record models


async def main():
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    await engine.dispose()


if __name__ == '__main__':
    asyncio.run(main())
