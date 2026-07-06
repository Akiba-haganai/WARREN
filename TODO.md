# TODO - Campus Map improvements

## Plan items
- [x] Add Supabase table + RLS policies (done via SQL)
- [x] Add geolocation hook + Haversine helper (`useGeolocation`, `getDistance`)
- [x] Update map component props to accept `userPosition` (kept unused for now; pins use `x_percent/y_percent`)
- [ ] Update `PinDrawer` with:
  - [ ] Walkthrough “Next Stop” / “Finish Walkthrough”
  - [ ] Share button (copy/share deep link `/campus-map?pin=<id>`)
  - [ ] Open/Closed indicator derived from `pin.hours`
- [ ] Update `CampusMapPage` with:
  - [ ] Deep link handling `?pin=<id>` opens drawer
  - [ ] First Day Route walkthrough button + steps for the 5 UUID pins
  - [ ] Missing place suggestion link + modal
  - [ ] On submit insert into `map_pin_suggestions`

## Potential build note
- `npm run build` failed earlier due to Windows EPERM emptying `dist/` while locked. If it happens again, close any process using `dist/` and retry.

## Notes
- Lint currently fails due to existing errors in `supabase/functions/send-push/index.ts` (unrelated to map changes).
