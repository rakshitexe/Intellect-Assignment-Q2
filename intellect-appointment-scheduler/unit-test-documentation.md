# ✅ Unit Test Documentation for Appointment Scheduler

This document outlines the complete set of unit tests written for the following components:

- `AppointmentScheduler`
- `DateSelector`
- `SlotSelector`

---

## 🔹 Component: `AppointmentScheduler`

### File: `tests/AppointmentScheduler.test.tsx`

| Test Case Description                                                                 | Expected Outcome                                                                 |
|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| 1. Renders loading state                                                              | Displays `"Loading..."` while data is being fetched                             |
| 2. Displays error state                                                               | Shows `"Error loading slots."` when an error is encountered                     |
| 3. Shows "no appointment slots" when no dates are available                          | Shows `"No appointment slots available."`                                       |
| 4. Auto-selects the first available date and renders slots                           | First available date is selected and respective slots are displayed             |
| 5. Triggers `onSlotSelect` callback on slot click                                     | Slot click calls the handler with correct slot data                             |
| 6. Updates slot selection visually on new selection                                   | Visual indication changes to show the new selection                             |
| 7. Updates slots when a different date is selected                                    | Shows time slots relevant to the newly selected date                            |
| 8. Gracefully handles dates with no slots                                             | Does not crash; fallback message like `"No available time slots"` is shown      |

---

## 🔹 Component: `DateSelector`

### File: `tests/DateSelector.test.tsx`

| Test Case Description                                                                 | Expected Outcome                                                                 |
|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| 1. Renders correctly with provided dates                                              | Date cards render with correct day and day-of-week labels                       |
| 2. Triggers `onSelectDate` when a date is clicked                                     | Calls handler with the correct ISO date                                         |
| 3. Disables left scroll button initially                                              | Left scroll button is disabled on initial render                                |
| 4. Ensures right scroll button is visible                                             | Right scroll button is enabled                                                  |
| 5. Highlights the currently selected date                                             | Selected date card has active styling (e.g., `border-gray-400`)                |
| 6. Renders correctly with empty dates                                                 | Displays "Pick a date" and does not crash                                       |
| 7. Scroll buttons are functional                                                      | Clicking left/right buttons does not cause crashes                              |

---

## 🔹 Component: `SlotSelector`

### File: `tests/SlotSelector.test.tsx`

| Test Case Description                                                                 | Expected Outcome                                                                 |
|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| 1. Renders heading and helper text                                                    | Shows `"Available time slots"` and session duration helper                      |
| 2. Renders all passed slot options                                                    | All slot buttons are rendered as per the passed prop                            |
| 3. Highlights the selected slot visually                                              | Selected slot has specific class (e.g., `bg-[#e7e7e7]`)                          |
| 4. Calls `onSelect` handler when a slot is clicked                                    | `onSelect` callback receives the selected slot                                  |
| 5. Handles empty slot list gracefully                                                 | Renders fallback UI without errors                                              |
| 6. Updates UI when selected slot changes                                              | Selection is updated and reflected in styling                                   |
| 7. Handles clicking already selected slot gracefully                                  | Still calls `onSelect`, no crash                                                |
| 8. Shows fallback message when no slots are available                                 | Displays `"No available time slots"`                                            |

---

## 🧩 Additional Considerations

- **Mocking**: `useSlots` hook is mocked using `vi.mock` in the `AppointmentScheduler` tests.
- **Accessibility**: Tests rely on `getByRole`, `getByText`, and `within` queries to simulate real user interactions.
- **Resilience**: Edge cases such as empty date lists, empty slot lists, and re-clicking selected items are explicitly tested.

---

## ✅ Coverage Summary

| Component          | # of Test Cases | Edge Cases Covered | Interaction Logic Covered |
|--------------------|------------------|---------------------|-----------------------------|
| AppointmentScheduler | 8                | ✅ Yes              | ✅ Yes                      |
| DateSelector        | 7                | ✅ Yes              | ✅ Yes                      |
| SlotSelector        | 8                | ✅ Yes              | ✅ Yes                      |
"""