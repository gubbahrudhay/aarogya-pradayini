Perfect. I would actually make this like a Software Requirements Specification (SRS) so Antigravity understands the entire product instead of just generating pages. This usually produces much better code.

---

# PROJECT_SPEC.md

# [STATUS: FULLY IMPLEMENTED] Sri Sathya Sai Aarogya Pradayini – Admin Portal & AI Content Management System

## Overview (Core Admin Portal Built)

Build a production-ready administration portal for the **Sri Sathya Sai Aarogya Pradayini** NGO website.

The NGO conducts **one free medical camp every month (2nd Sunday)** in **Kalwakurthy, Telangana**.

The public website is hosted on **Vercel**.

Only authorized administrators should be able to manage content.

The system must generate AI-powered blog posts and social media drafts while maintaining enterprise-grade security.

---

# Tech Stack

Frontend

* React 19
* Vite
* TailwindCSS
* React Router
* Framer Motion
* React Hook Form
* React Quill or Tiptap
* React Query

Backend

* Firebase Authentication
* Firestore Database
* Secure Server Functions (Firebase Functions or Vercel Functions)

Hosting

* Vercel

AI

* OpenAI API

Image Repository

* GitHub Repository (NOT Firebase Storage)

Video

* YouTube Embeds

---

# Public Website

Visitors can only access

Home

About

Services

Gallery

Blogs

Health Awareness

Volunteer

Donate

Contact

No admin functionality should ever be exposed.

---

# Admin Portal

Routes

```
/admin/login

/admin/dashboard

/admin/camps

/admin/blogs

/admin/gallery

/admin/health-blogs

/admin/settings

/admin/users
```

---

# Authentication

Use Firebase Authentication.

Google Login only.

After login

Check

```
admins
```

collection.

If email is NOT present

Immediately logout.

Redirect

```
/admin/login
```

Never allow authenticated but unauthorized users.

---

# Role Based Access

## Super Admin

Can

* Manage Admins
* Publish Blogs
* Delete Blogs
* Upload Images
* Connect Social Media
* Change Settings

---

## Editor

Can

* Create Camp
* Edit Camp
* Generate AI
* Publish Website

Cannot

* Delete
* Manage Users

---

## Volunteer

Can

* Upload Photos

Cannot

* Publish

Cannot

* Generate AI

---

# Dashboard

Cards

```
Total Camps

Draft Blogs

Published Blogs

Health Blogs

Gallery Images

Messages

Recent Activity
```

Quick Actions

```
+ New Camp

+ Health Blog

Gallery

Settings
```

---

# Monthly Camp Workflow

Admin

↓

Click

```
New Camp
```

↓

Fill

Camp Number

Camp Date

Camp Location

Paste WhatsApp Report

Upload Photos

Paste YouTube Links

↓

Click

```
Generate AI
```

---

# AI Processing

Gemini should automatically

Extract

* Camp Number
* Date
* Total Patients
* Male
* Female
* Doctors
* BP Tests
* Sugar Tests
* Cataract Cases
* Pterygium Cases
* Villages Covered
* Volunteers
* Medicines

Generate

* Blog
* Summary
* SEO Description
* LinkedIn Post
* Instagram Caption

Return JSON

---

# Camp Editor

Sections

General

Statistics

Doctors

Gallery

Videos

Blog

LinkedIn

Instagram

Preview

---

# Draft System

Every generated item is saved as

```
status = draft
```

Admin edits.

Admin clicks

```
Publish Website
```

↓

status becomes

```
published
```

Website updates instantly.

---

# LinkedIn

Each camp stores

```
linkedinDraft

linkedinStatus

linkedinPostId
```

Button

```
Publish LinkedIn
```

Workflow

```
Review

↓

Publish

↓

LinkedIn API

↓

Success

↓

linkedinStatus = published
```

---

# Instagram

Stores

```
instagramDraft

instagramStatus

instagramPostId
```

Button

```
Publish Instagram
```

Uses

Meta Graph API.

---

# Gallery

NO Firebase Storage.

Images stored only in GitHub.

Repository structure

```
gallery/

2026/

June/

cover.webp

registration.webp

doctor.webp

bp.webp

eye.webp

July/

...
```

---

# Image Upload

Workflow

```
Upload Images

↓

Backend

↓

Compress

↓

Convert WebP

↓

Generate Thumbnail

↓

Commit to GitHub

↓

Return URLs

↓

Save metadata in Firestore
```

Never upload directly from browser to GitHub.

Frontend NEVER has GitHub Token.

---

# Firestore

admins

```
email

role

createdAt
```

blogs

```
title

slug

summary

content

coverImage

galleryImages

youtubeVideos

statistics

linkedinDraft

instagramDraft

linkedinStatus

instagramStatus

status

createdAt

updatedAt
```

gallery

```
month

year

coverImage

images

videos

blogId
```

healthBlogs

```
title

content

coverImage

status
```

contacts

```
name

email

message

createdAt
```

---

# Statistics Object

```
patients

male

female

villages

bpTests

sugarTests

cataracts

pterygium

volunteers
```

---

# Blog Editor

Rich Text

Features

* Headings
* Lists
* Tables
* Images
* Links
* YouTube
* Preview
* Autosave

---

# Admin UI

Sidebar

Dashboard

Medical Camps

Gallery

Health Blogs

Messages

Settings

Users

Logout

---

# Activity Log

Record

Login

Logout

Generate AI

Publish

Delete

Upload Images

LinkedIn Publish

Instagram Publish

Include

Timestamp

User

Action

---

# Settings

Connected Accounts

LinkedIn

Instagram

Reconnect Button

Display

Connected

Disconnected

---

# Security

Highest Priority

Implement

✅ Protected Admin Routes

✅ Firebase Authentication

✅ Firestore Security Rules

✅ Role Based Access

✅ HTTPS Only

✅ Environment Variables

✅ No GitHub Token in Browser

✅ No LinkedIn Token in Browser

✅ No Instagram Token in Browser

✅ Secure Server Functions

✅ File Validation

✅ File Size Limits

✅ WebP Conversion

✅ XSS Protection

✅ HTML Sanitization

✅ Rate Limiting

✅ Input Validation

✅ CSRF Protection

✅ Secure Logout

✅ Session Persistence

✅ Auto Logout after inactivity

✅ No Public Writes

---

# Firestore Rules

Public

Read only

Published Blogs

Gallery

Health Blogs

No writes.

Authenticated

Only approved admins.

Editors

Cannot delete.

Volunteers

Cannot publish.

---

# Environment Variables

```
VITE_FIREBASE_API_KEY

VITE_FIREBASE_AUTH_DOMAIN

VITE_FIREBASE_PROJECT_ID

OPENAI_API_KEY

GITHUB_TOKEN

GITHUB_OWNER

GITHUB_REPO

LINKEDIN_CLIENT_ID

LINKEDIN_SECRET

META_APP_ID

META_APP_SECRET
```

Never expose secrets to frontend.

---

# Folder Structure

```
src/

admin/

components/

pages/

hooks/

services/

firebase/

contexts/

layouts/

utils/

types/

styles/

functions/

public/

gallery/

assets/
```

---

# Design

Modern

Healthcare

Premium

Minimal

Apple-level spacing

White backgrounds

Blue primary

Orange accents

Rounded cards

Subtle animations

Responsive

Accessible

---

# Future Features

* AI health awareness blog generation
* Monthly report PDF generation
* Volunteer management
* Event calendar
* Email newsletter
* Search
* Analytics dashboard
* Donation analytics
* Multi-language support (English & Telugu)
* Camp attendance trends
* Export to Excel/PDF
* AI image tagging

---

## Final Instruction to Antigravity

> Build this as a **production-ready application**, not a prototype. Prioritize security, maintainability, scalability, reusable React components, clean architecture, and an excellent user experience. Every feature should be modular and extensible so future capabilities can be added without major refactoring. The system should be intuitive enough that a non-technical NGO volunteer can manage monthly camp updates with minimal training.
@