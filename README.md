# Messaging web app built with React

## Table of contents

1. [Overview](#overview)
2. [Learning Objectives](#objectives)
3. [Features](#features)
4. [How to install](#install)
5. [Demos](#demos)

<a id="overview"></a>

## 1. Overview

![Main demo](assets/Main%20demo.gif)

This is the client side of the application.
The server can be found [here](https://github.com/PBara7a/chat-app-server).

App built with React, Bootstrap, Node.js, Express, Socket.io, Prisma and PostgreSQL.

- A unique contact number is attributed to every registered user.
- Users can send messages to other individual users or to group chats.
- The message content is encrypted and decrypted on the client side.

<a id="objectives"></a>

## 2. Learning Objectives

- Understand the advantages and use the useContext hook to share data between components, as an alternative to props.
- Allow the user to perform create, read, update and delete operations on data.
- Learn the basics of websockets and how to maintain two-way real-time interactive communication between client and server.
- How to implement end-to-end encryption.
- Consuming and external API (Tenor).

<a id="features"></a>

## 3. Features

- Data is stored in persistent storage.
- The user can manage their contact list.
- Messages can be sent to individual users or groups of users.
- Users can make their communications more engaging by sharing animated gifs in their chats.
- Messages are protected by end-to-end encryption.
- Contacts and chats can be filtered by name.

<a id="install"></a>

## 4. How to install

1. Get the server up and running. Follow instructions [here](https://github.com/PBara7a/chat-app-server).
2. Fork and clone this repository.
3. Install dependencies
   ```sh
   npm install
   ```
4. Create your .env.development file, use .env.development.example as a reference.
5. Start the application
   ```sh
   npm start
   ```

<a id="demos"></a>

## 5. Demos

### Register user

![Register user demo](assets/Register%20user%20demo.gif)

### Add new contact

![Add new contact demo](assets/New%20contact%20demo.gif)

### Start new chat

![Start new chat demo](assets/New%20chat%20demo.gif)

### Send animated gifs

![Sending gifs demo](assets/GIF%20demo.gif)

### Filter contacts/chats

![Filter contacts or chats demo](assets/Filter%20demo.gif)

<a id="license"></a>
