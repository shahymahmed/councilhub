# CouncilHub — Fresh Real Staff Build

This version starts the work database from zero:
- 39 real people loaded from the supplied Excel workbook.
- No draft/sample tasks, projects or events.
- Login uses registered mobile number + ID number.
- ID number is the displayed Staff ID.
- Authorized assigners: Council President, Council Vice President, Council Members, Council Executive, Assistant Council Executive, Senior Council Officer and Secretary General.
- Admin controls are enabled for staff ID 48627 in this build and can be changed in `app.js`.
- Authorized assigners can add/edit/delete tasks, projects and events.
- Other staff can open and update only tasks assigned to them.
- Group/multi-staff task assignment.
- Projects have Ongoing / Upcoming / Completed / All tabs, countdown, duration, budget, progress and non-working days.
- Project Progress Report can be printed/saved as PDF through the browser print dialog.
- 14-day schedule is included.
- Mobile sidebar is fully collapsible.
- Data is local to the browser for this pre-Supabase finalisation stage.

Important data notes:
- Emran Ahmed has no ID number in the supplied workbook, so he cannot log in until an ID is added.
- Hamid Abdulla has `-` as the ID in the supplied workbook, so he cannot log in until a valid ID is added.
- `A141396` appears for two Ahmed Mohamed records with different mobile numbers. Login uses the exact ID + mobile pair, so both records remain distinguishable for now. Before production authentication, this duplicate should be resolved.

Next stage after you approve the interface: move the finalized data model and permissions to Supabase with proper authentication, server-side role enforcement, backups and secure push notifications.
