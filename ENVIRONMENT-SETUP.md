# WMS SEO Monitor — Environment Setup Guide

This guide details all environment variables required by **WMS TRANSPORT** and the **WMS SEO Monitor**.  
**Security Notice**: This document contains NO secrets, tokens, or credentials.

---

## Environment Variables Specification

| Variable Name | Required Scope | Purpose / Description | Setup Instructions |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Local & Production | Canonical site URL (e.g. `https://wms-transport.com`). Used for canonical headers and metadata. | Set to `https://wms-transport.com` in production; `http://localhost:3000` for local testing. |
| `SEO_DASHBOARD_PASSCODE` | Local & Production | Passcode used to authenticate into `/seo-monitor`. | Generate a strong, high-entropy secret string (minimum 16 characters). Set only on server-side. |
| `GSC_KEY_FILE_PATH` | Local Development | Absolute file path to the Google Cloud Service Account JSON key. | Set to the location of the downloaded key file on the local developer machine. |
| `GSC_SERVICE_ACCOUNT_EMAIL` | Production (Vercel) | Email address of the Google Cloud Service Account. | `wms-seo-reader@wms-seo-monitor.iam.gserviceaccount.com` (from GCP project `wms-seo-monitor`). |
| `GSC_PRIVATE_KEY` | Production (Vercel) | Private key for the service account (PEM format with `\n` linebreaks). | Copy from the `private_key` field in the GCP JSON credential file. Never share or log. |
| `PAGESPEED_API_KEY` | Local & Production | Google Cloud API key for PageSpeed Insights API v5. | Follow the step-by-step instructions in the section below. |
| `DATABASE_URL` | Production (Recommended) | PostgreSQL connection string for durable data storage. | Neon, Supabase, or Vercel Postgres connection string (e.g. `postgresql://<user>:<password>@<host>/<database>?sslmode=require`). |
| `LINE_CHANNEL_ACCESS_TOKEN` | Production (Optional) | LINE Messaging API Channel Access Token for internal staff alerts. | Obtained from LINE Developers Console for WMS TRANSPORT channel. |
| `LINE_CHANNEL_SECRET` | Production (Optional) | LINE Messaging API Channel Secret for webhook signature validation. | Obtained from LINE Developers Console. |
| `LINE_NOTIFICATION_GROUP_ID` | Production (Optional) | LINE Group ID for receiving automated quotation notifications. | Configured via `/api/line/setup` or manual group ID extraction. |

---

## Owner Instructions: Creating & Restricting PageSpeed API Key

Follow these exact steps to enable Google PageSpeed Insights without exposing or sharing keys:

1. **Access Google Cloud Console**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Select the project: **`wms-seo-monitor`**.

2. **Enable the API**:
   - In the navigation menu, select **APIs & Services** &rarr; **Library**.
   - Search for **"PageSpeed Insights API"**.
   - Click **Enable**.

3. **Generate API Key**:
   - Navigate to **APIs & Services** &rarr; **Credentials**.
   - Click **+ CREATE CREDENTIALS** &rarr; select **API key**.
   - A modal will show the generated key. **Do not paste this into any chat or public repo**.

4. **Restrict the API Key**:
   - Click **Edit API Key** (or the pencil icon next to the new key).
   - Under **API restrictions**, choose **Restrict key**.
   - In the dropdown, select **PageSpeed Insights API** only.
   - Click **Save**.

5. **Deploy the Key**:
   - For **Local Development**: Add to your local `.env.local`:
     ```bash
     PAGESPEED_API_KEY=your_copied_key_here
     ```
   - For **Production (Vercel)**:
     - Open Vercel Project Dashboard &rarr; **Settings** &rarr; **Environment Variables**.
     - Add `PAGESPEED_API_KEY` with the key value for **Production** and **Preview** environments.
     - Redeploy or trigger a new deployment.

