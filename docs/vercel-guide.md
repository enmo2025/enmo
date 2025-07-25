# 📘 Vercel & Vercel blob Integration

## 🧩 Overview – Vercel & Vercel Blob

### 🚀 Vercel

Vercel is a cloud platform for frontend developers, designed to host static sites and modern web applications with zero configuration. It's the creator of Next.js and provides seamless CI/CD, serverless functions, global edge delivery, and integration with Git.

#### Key Features:

- ⚡ Instant deployments via Git push
- 🌍 Global CDN with edge caching
- 🧩 Built-in support for Next.js, React, and more
- 🔁 Serverless API routes and background jobs
- 📦 Integrations with GitHub, GitLab, Bitbucket

### 💾 Vercel Blob

Vercel Blob is a built-in, zero-config file storage solution for Vercel projects. It allows you to upload, store, and serve files (images, videos, documents, etc.) with automatic CDN delivery and access control.

#### Key Features:

- 🔼 Simple file upload via API (@vercel/blob)
- 🌐 Public or private file access with signed URLs
- 🚀 Instant CDN delivery for uploaded files
- 🔐 Secure and scalable file storage
- 🧾 Ideal for user uploads, image galleries, file attachments, etc.

---

## 🛠️ Vercel – Setup Guide

### ✅ Prerequisites

- A GitHub / GitLab / Bitbucket account
- A project ready to deploy (e.g. Next.js, React, etc.)

### 🔹 Step 1: Sign Up or Log In to Vercel

- Visit https://vercel.com
- Click “Start Deploying”
- Log in with GitHub, GitLab, or Bitbucket

### 🔹 Step 2: Import Your Project

- Once logged in, click “New Project”
- Choose the Git repository you want to deploy
- Select the framework (e.g. Next.js) — Vercel will detect it automatically
- Configure project settings if needed (e.g. build command, output directory)

> ✅ For Next.js, no config is usually needed (next build is auto-detected).

### 🔹 Step 3: Set Environment Variables (Optional)

- If your app needs environment variables (e.g., API keys, DB URL), go to:
- Project Settings > Environment Variables

Example:

```
DATABASE*URL=postgres://username:password@host:port/dbname
STRIPE_SECRET_KEY=sk_test*...
```

### 🔹 Step 4: Deploy!

- Click “Deploy”

- Vercel will install dependencies, build your app, and deploy it to a unique URL like:

```
https://your-app.vercel.app
```

> 🔄 Every time you push to the linked Git repo, Vercel automatically redeploys.

### 🔹 Step 5: Custom Domain (Optional)

- Go to your project → Settings > Domains
- Add a custom domain (e.g. myapp.com)
- Follow the DNS setup instructions

### 🔹 Step 6: Monitor & Manage

- View build logs, deployment history, and performance in your Vercel dashboard
- Use Serverless Functions, Storage, and Edge Middleware as needed

---

## 🛠️ Vercel Blob – Setup Guide

### ✅ Prerequisites

- A project deployed on Vercel (e.g. Next.js)

- Git connected (GitHub/GitLab/Bitbucket)

- Node.js environment

### 🔹 Step 1: Enable Vercel Blob

- Go to your project’s dashboard on https://vercel.com

- Click on your project → Storage tab

- Under Blob Storage, click “Enable”

- Vercel will create a default Blob bucket for your project

### 🔹 Step 2: Install the Blob SDK

- In your local project:

```
npm install vercel/blob
```

### 🔹 Step 3: Add token in `.env` (Optional)

- If your Vercel project (deployed app) and Blob storage belong to different accounts, the app won't have default access.
- You’ll need to use a read/write token from the Blob account.
- Steps:
  - In Quick start section click on `.env.local` tab.
  - Copy `BLOB_READ_WRITE_TOKEN`

example:

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxx
```

> ⚠️ Note: Make sure .env is listed in your .gitignore to keep credentials safe.

### 🔹 Step 4: Create an Upload API Route

- File: app/api/upload/route.ts (Next.js App Router)

```
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
const formData = await req.formData();
const file = formData.get('file') as File;

if (!file) {
return NextResponse.json({ error: 'No file provided' }, { status: 400 });
}

const blob = await put(file.name, file, {
access: 'public', // or 'private'
});

return NextResponse.json({ url: blob.url });
}
```

### 🔹 Step 5: Upload File from Frontend

- Here’s an example React component:

```
'use client';
import { useState } from 'react';

export default function UploadForm() {
const [url, setUrl] = useState('');

const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
const fileInput = e.currentTarget.file as HTMLInputElement;
const file = fileInput.files?.[0];
if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUrl(data.url);

};

return (
    <form onSubmit={handleUpload}>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
      {url && (
        <p>
          Uploaded: <a href={url}>{url}</a>
        </p>
      )}
    </form>
  );
}
```

### 🔹 Step 6: View Uploaded Files

- Go to your project → Storage > Blob
- You’ll see all uploaded files with public URLs
- You can delete or manage files directly in the dashboard

### 🔹 Step 7: (Optional) Set private Access

If you want to restrict file access:

```
const blob = await put(file.name, file, {
  access: 'private',
});
```

---

## 📚 References

- [Vercel Deployment](https://vercel.com/docs/deployments)
- [Vercel blob](https://vercel.com/docs/vercel-blob)
