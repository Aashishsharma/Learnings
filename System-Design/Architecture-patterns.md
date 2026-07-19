# Architecture Patterns

You should clearly know the fundamental difference between each architecture.

## 1. Multi-layered Architecture

- Logical separation of the codebase into modules.
- Even though there are multiple modules, **at runtime this architecture acts as a single-tier architecture**, so all code runs on one machine.
- Modules are logically separated, not physically.

## 2. Multi-tier Architecture (3-Tier / N-Tier)

- Modules are **physically separated**.
- Each module runs on a different physical layer/server.
- MVC can be both:
  - **Multi-layered** if all application code runs as a single runtime unit.
  - **Multi-tiered** if each module runs on a different machine (e.g., API on one server, UI on another).

Popular 3-tier architecture:

- Presentation Layer
- Business Layer
- Data Layer

---

## N-Tier Architecture

## Example 1

### Tier 1: Client Tier
**User's Laptop or Phone**

- HTTPS

### Tier 2: Web & CDN Tier
**Static content delivery, DDoS protection**

- API / gRPC

### Tier 3: Application Tier
**Core business logic, APIs**

- TCP / Internal

### Tier 4: Cache & Queue Tier
**Redis (fast memory), RabbitMQ (background tasks)**

- SQL / NoSQL

### Tier 5: Database Tier
**Secure, permanent data storage**

---

## Example 2 (Banking System)

### Tier 1: Client Tier
**Mobile App on your Phone**

- HTTPS / TLS 1.3

### Tier 2: Security & WAF Tier
**Web Application Firewall & MFA Authentication**

- API / gRPC

### Tier 3: Core Banking Logic
**Transaction routing, interest calculations**

- Private Network

### Tier 4: Audit & Logging Tier
**Write-once log stream (Immutable Ledger / Kafka)**

- Mainframe DB / SQL

### Tier 5: Ledger Database Tier
**Mainframe Database (System of Record)**

---

# Key Architectural Constraints for Multi-Tier Architecture

1. Communication between each layer should follow a **client-server architecture**.
   - You can use REST, GraphQL, gRPC, or anything as long as it is client-server.

2. A tier can communicate **only with the directly adjacent tier**.
   - Tier 1 cannot call Tier 3 directly.
   - Tier 2 should not call Tier 5 directly.

3. **Unidirectional Flow Constraint**
   - The flow is always fixed.
   - Lower tiers should never initiate communication with upper tiers.

---

# Drawback of Multi-Tier Architecture

- All business logic resides in the same codebase, making the **Business Layer a monolith** (a single runtime unit).

---

# Microservices

In a 3-tier architecture, the Business Layer becomes a monolith.

Microservice architecture organizes the Business Layer as a collection of **loosely coupled** and **independently deployable** services.

## Key Constraints

1. Each microservice should be responsible for only **one business capability/domain**.

2. Each service should ideally have **its own database**.

3. Unlike N-tier architecture, **any microservice can communicate with any other microservice**.
   - Communication is **not restricted to unidirectional flow**.

   ## Event-Driven Architecture

- Enables **asynchronous communication** between different microservices.
- Applications do **not communicate via direct APIs**.
- An **event** is an immutable statement of fact (something that has already happened).
- Components:
  - Event Producers
  - Event Consumers
  - Message Broker (SQS, Kafka, RabbitMQ, etc.)

---

## CQRS (Command Query Responsibility Segregation)

CQRS separates **read** and **write** responsibilities.

## CQRS solves two major performance problems

1. **Makes the application database both read-optimized and write-optimized**
   - Separates reads and writes into different databases, each optimized for its own workload.

2. **Enables efficient joins across data from multiple databases**
   - Instead of performing expensive cross-database joins at runtime, CQRS builds pre-joined read models asynchronously using events.

### Problem

Normally, the same database is responsible for both reads and writes.

- Reads require heavy indexing and optimized queries.
- Writes require fast inserts/updates.
- Optimizing for one often hurts the other.

### Solution

Split the system into two databases:

- **Command DB (Write Database)** → Optimized for Create, Update, Delete operations.
- **Query DB (Read Database)** → Optimized for read-heavy workloads.

### How It Works

1. Client sends a **write request**.
2. Request goes to the **Command Service**.
3. Command Service writes data into the **Command DB**.
4. An event is published to a **Message Broker**.
5. Read Service consumes the event.
6. Read Service updates the **Query DB**.
7. Read requests always hit the **Query DB**.

---

### Benefits

- Read and write databases can use **different technologies**.
  - Example:
    - Command DB → PostgreSQL / MySQL
    - Query DB → DynamoDB / Elasticsearch
- Read performance can be independently optimized.
- Write performance remains fast.
- Each database is optimized for its own workload.

---

### Eventual Consistency

Since the Read DB is updated asynchronously:

- The Write DB is updated first.
- Read DB is updated shortly afterward.
- Users may temporarily see stale data.

Example:

User adds a Todo item.

- Write DB stores it immediately.
- API returns success.
- UI may not show the new Todo for a short time until the Read DB is synchronized.

For responsive UIs, techniques such as **Optimistic UI Updates** are commonly used.

---

### Joins in CQRS

Since each microservice owns its own database:

- Cross-service joins are **not performed at query time**.
- Instead, services build **pre-joined read models** by consuming events.
- The join happens asynchronously behind the scenes, not during API execution.

---

## CQRS Implementation

### 1. Managed CDC (Change Data Capture)

AWS Database Migration Service (DMS) can:

- Read database replication logs (binary logs/WAL).
- Capture inserts, updates, and deletes.
- Automatically propagate changes.
- Flatten and synchronize data into another database such as DynamoDB or DocumentDB.

---

### 2. Debezium

Debezium:

- Monitors database transaction logs.
- Converts database changes into Kafka events.
- Streams changes into downstream systems.

Useful when:

- Using Kafka.
- Building custom event-driven architectures.
- Synchronizing multiple databases.

---

### 3. Application-Level Events

Instead of relying on CDC:

- Application code publishes events after successful transactions.
- Consumers update their own read models.
- Gives maximum flexibility but requires more implementation effort.

---

## Summary

- **CQRS** separates read and write operations into different databases.
- Read and write databases can use different storage technologies.
- Read models are updated asynchronously through events.
- CQRS improves scalability and performance.
- Trade-off: **Eventual Consistency** and increased architectural complexity.
- Use CQRS only when performance or scalability requirements justify it.

# Pending Architecture Patterns

- [ ] Modular Architecture
- [ ] Microkernel Architecture (Plug-in Architecture)
- [ ] Onion Architecture
- [ ] Hexagonal Architecture (Ports & Adapters)
- [ ] CQRS with Event Sourcing
- [ ] Service-Oriented Architecture (SOA)
- [ ] Clean Architecture