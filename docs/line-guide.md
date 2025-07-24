
# 📘 LINE Integration: Login, Messaging API, and Webhook

## 🧩 Overview

This document explains how to integrate three main LINE services in your application:

- **LINE Login (OAuth2)**: Authenticate users via LINE accounts.
- **LINE Messaging API**: Send messages to users who have added your Official Account (OA).
- **LINE Webhook**: Receive events like `follow`, `unfollow`, or `message` from users.

---

## 1. 🔐 LINE Login - OAuth2 Flow

### ✅ Purpose

- Authenticate users through LINE.
- Retrieve user profile: `displayName`, `userId`, `email`, `pictureUrl`.
- Create session and store user data in the database.

### 🔁 Flow Description

#### a. `/auth/line/start.ts`

- Generate a `codeVerifier` and encode a `state` payload (includes redirect URL and the verifier).
- Redirect users to LINE’s authorization page.

Example:
    const statePayload = { codeVerifier, redirect };
    const state = Buffer.from(JSON.stringify(statePayload)).toString('base64');
    const authUrl = line.createAuthorizationURL(state, codeVerifier, scopes);
    return Response.redirect(authUrl.toString());

#### b. `/auth/line/callback.ts`

- LINE redirects the user back to your server with `code` and `state`.
- Validate the authorization code using Arctic's helper.
- Fetch the user's profile using the access token.
- Find or create a `User` record in the database.
- Create session and set session cookie.
- Send a welcome message via Messaging API.

Example:
    const tokens = await line.validateAuthorizationCode(code, codeVerifier);
    const lineUser = await lineService.getProfile(tokens);
    const existingUser = await prisma.user.findFirst({ where: { lineId: lineUser.userId } });
    ...
    await lineService.sendMessage(user.lineId, [{ type: 'text', text: messageTemplate(user).welcome.text }]);

---

## 2. 💬 LINE Messaging API - Sending Messages

### ✅ Purpose

- Automatically send messages to users who have followed your LINE OA.
- Useful for welcome messages or notifications.

### 🔐 Requirements

- Set your `LINE_BOT_CHANNEL_ACCESS_TOKEN`.
- The target user **must have followed** your LINE OA (friend status = true).

### 📦 Example usage in `line.service.ts`

Example:
    async sendMessage(lineUserId: string, messages: LineMessage[]): Promise<boolean> {
      const response = await fetch(`${this.baseUrl}/message/push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({ to: lineUserId, messages }),
      });
      ...
    }

### 💡 Message Template Example

Example:
    {
      type: 'text',
      text: 'Welcome to our platform!'
    }

---

## 3. 📡 LINE Webhook - Receiving Events

### ✅ Purpose

- Track user actions like `follow`, `unfollow`, or messages.
- Update user relationship status (`isFriend`) or trigger automations.

### 🔁 Flow Description

- LINE sends a `POST` request to your webhook URL when an event occurs.
- Your server reads the first `event` object from the payload.
- Based on `event.type`, handle accordingly.

### 📦 Webhook handler (`POST` method)

Example:
    const event = body.events[0];
    const lineId = event.source.userId;
    const eventType = event.type;

    switch (eventType) {
      case 'follow':
        await prisma.user.update({ where: { lineId }, data: { isFriend: true } });
        break;
      case 'unfollow':
        await prisma.user.update({ where: { lineId }, data: { isFriend: false } });
        break;
    }

### 📥 Sample Payload

Example:
    {
      "events": [
        {
          "type": "follow",
          "timestamp": 1628794350832,
          "source": {
            "type": "user",
            "userId": "U1234567890abcdef1234567890abcdef"
          }
        }
      ]
    }

---

## 4. 🧪 Testing Checklist

| Action | Expected Result |
|--------|-----------------|
| Login with LINE | Creates or finds user, starts session, sends welcome message |
| Send message via `sendMessage` | Message appears in user's LINE chat |
| Unfollow then Follow OA | `isFriend` toggled accordingly in DB |
| Send message to OA | Ready for custom auto-replies or logging |

---

## 5. 🔐 Security Notes

- It's recommended to verify the `X-Line-Signature` in webhook headers using your `channelSecret`.
- Never fully trust incoming webhook payloads without validation.
- Always wrap API calls with proper error handling.

---

## 6. 📚 References

- [LINE Login Docs](https://developers.line.biz/en/docs/line-login/integrate-line-login/)
- [Messaging API Overview](https://developers.line.biz/en/docs/messaging-api/overview/)
- [Webhook Event Reference](https://developers.line.biz/en/docs/messaging-api/receiving-messages/)
