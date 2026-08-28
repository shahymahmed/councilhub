# Council Digital Monitoring Platform — Version 2 Prototype

This version adds the requested Council workforce features.

## New features
- Assign one task to many staff members at once.
- Assign tasks to predefined groups such as Sections, Units, Support Staff, Mosque Staff/Committees, etc.
- Staff records include ID number, registered phone number, rank/role and official email.
- Prototype sign-in using ID number or phone number.
- Idhaaree-origin staff records are marked in the interface; production integration requires the Council's authorized Idhaaree/API/identity route.
- Mobile-friendly interface.
- Task proof/evidence upload.
- On a phone, the image field uses `capture="environment"` so the device can offer its camera.
- Multiple proof images can be retained against a task.
- Task updates with evidence create an activity/audit entry.
- Assignment/update notifications are simulated in this prototype.
- Existing project, event, schedule, team and audit features remain.

## Important production architecture
The prototype deliberately does not fake a real Idhaaree connection, phone-number authentication, push-notification service, or cloud database.

A production build should use:
1. Secure Council authentication/identity service.
2. Authorized Idhaaree integration if available to the Council.
3. Phone-number verification/OTP or an approved SSO flow.
4. PostgreSQL or another secure central database.
5. Object storage for task evidence/photos.
6. Real push notifications (Android/iOS/web).
7. Role-based access control.
8. Audit logs and retention rules.
9. Encryption in transit and at rest.
10. Backup and disaster recovery.

## Run
Open `index.html` in a modern browser. Demo users:
- A123456 / 9607000001
- A123457 / 9607000002
- A123458 / 9607000003
- A123459 / 9607000004
- A123460 / 9607000005

Changes are stored locally in browser storage in this prototype.


## Version 3 requirements implemented
- Admin Control Centre.
- Admin-only staff registration.
- Staff registry with ID, phone, official email, rank and directory source.
- Admin-controlled project-viewer approval after identity verification.
- Viewer role is view-only and limited to project progress.
- Reports dashboard and report generation actions.
- Staff feedback and 1–5 star ratings.
- Portal issue reporting and admin resolution queue.
- Clear separation between internal staff access, administrator access and external project-view access.

Prototype note: authentication, Idhaaree integration, real push notifications, central database, cloud photo storage and production-grade permissions still require a backend and authorized service integrations.
