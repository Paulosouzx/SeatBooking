<p align="center">
  <a href="https://paulosouza.netlify.app" target="_blank"><img src="logoPaulo.png" width="80" alt="Paulo Logo Portfolio" /></a>
</p>

## Description

This project consists of a **NestJS** application designed to manage seat bookings for an event, with a focus on concurrency and preventing race conditions. The application provides three main APIs to view available seats, book seats, and view seats booked by a specific user.

The application uses an in-memory database (e.g., an array or Map) to store seat availability and bookings, ensuring a lightweight and efficient solution. Optionally, you can integrate a database like PostgreSQL or SQLite. In this project, PostgreSQL was used in a Docker container.

## Dependencies

**@nestjs/common, @nestjs/core** - Core modules required for building a NestJS application.

**@nestjs/platform-express** - Integrates NestJS with the Express framework.

**@nestjs/swagger & swagger-ui-express** - Provides API documentation using OpenAPI (Swagger).

**@nestjs/typeorm & typeorm** - ORM for database management, facilitating integration with PostgreSQL.

**class-validator & class-transformer** - Used for validating and transforming request data.

**pg** - PostgreSQL client for Node.js, allowing interaction with the database.

**reflect-metadata** - Enables TypeScript decorators, which are essential for NestJS and TypeORM.

**rxjs** - Provides reactive programming utilities, commonly used in NestJS for handling asynchronous data.

## Project setup

```bash
# Clone project
$ git clone https://github.com/Paulosouzx/SeatBooking

# install dependencies
$ npm install

# start database container
$ docker-compose up -d
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

# API Endpoints

**View Avaliable Seats**

Endpoint: **GET** /api/seats

Retrieves a list of all available seats.

```json
{
  "seats": [
    {
      "seatNumber": "A1",
      "status": "available"
    },
    {
      "seatNumber": "A2",
      "status": "booked"
    }
  ]
}
```

**Book Seats**

Endpoint: **POST** /api/seats

Books one or more seats for a specific user.

```json
# Request Body
{
  "userId": "user123",
  "seatNumbers":
  ["A1", "A2"]
}

# Success Response
{
  "message": "Seats successfully booked.",
  "bookedSeats":
  ["A1", "A2"]
}

# Failure Response
{
  "message": "Some seats could not be booked.",
  "failedSeats": ["A2"],
  "bookedSeats": ["A1"]
}
```

**View My Seats**

Endpoint: **GET** /api/seats?userId={userId}

Displays all seats booked by the specified user.

```json
{
  "userId": "user123",
  "bookedSeats": [
    {
      "seatNumber": "A1",
      "status": "booked"
    },
    {
      "seatNumber": "A3",
      "status": "booked"
    }
  ]
}
```

## Conclusion

Learning NestJS has been an incredibly valuable experience. Before this, I had never really looked into this tool, but as I explored it, I realized how powerful and well-structured it is for backend development. I really enjoyed its modular approach, seamless integration with TypeScript, and the ease of working with concepts like dependency injection and validation.

Thank you for opportunity! :)
