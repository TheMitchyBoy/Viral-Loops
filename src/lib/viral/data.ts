import {
  NeighborhoodZone,
  LivePoll,
  AudioDrop,
  ScarcityDrop,
  RecruitmentCampaign,
  BusinessPartner,
  AlumniClass,
  RoleDefinition,
  MysterySerial,
} from "./types";
import { SITE_NAME } from "../brand";
import { INVESTIGATION_POST_ID } from "../constants";

export const NEIGHBORHOOD_ZONES: NeighborhoodZone[] = [
  {
    id: "oak-street",
    name: "Oak Street / Downtown",
    zipCodes: ["92501", "92502"],
    threshold: 15,
    storyId: INVESTIGATION_POST_ID,
    storyTitle: "PeaceHealth Ketchikan Dossier",
    color: "#ed751a",
  },
  {
    id: "creek-view",
    name: "Creek View Lane",
    zipCodes: ["92503"],
    threshold: 10,
    storyId: INVESTIGATION_POST_ID,
    storyTitle: "PeaceHealth Ketchikan Dossier",
    color: "#059669",
  },
  {
    id: "school-district",
    name: "Unified School District",
    zipCodes: ["92504"],
    threshold: 20,
    storyId: "school-board",
    storyTitle: "School Board Decisions Coverage",
    color: "#2563eb",
  },
  {
    id: "maple-row",
    name: "Restaurant Row / Maple",
    zipCodes: ["92505", "92506"],
    threshold: 12,
    storyId: "harbor-expansion",
    storyTitle: "Harbor Expansion Working Waterfront",
    color: "#9333ea",
  },
  {
    id: "central-park",
    name: "Central Park / Market",
    zipCodes: ["92507"],
    threshold: 8,
    storyId: "cruise-season",
    storyTitle: "Cruise Season Economics Guide",
    color: "#dc2626",
  },
];

export const LIVE_POLLS: LivePoll[] = [
  {
    id: "poll-contamination",
    storyId: INVESTIGATION_POST_ID,
    title: "PeaceHealth Investigation Vote",
    question: "Should we publish the names of officials who withheld healthcare staffing data from the public?",
    options: [
      { id: "publish", label: "Yes — full transparency" },
      { id: "redact", label: "Redact names, publish findings" },
      { id: "wait", label: "Wait for official response first" },
    ],
    endsAt: "2026-06-20T23:59:59Z",
    unlockStoryId: INVESTIGATION_POST_ID,
  },
];

export const AUDIO_DROPS: AudioDrop[] = [
  {
    id: "a1",
    title: "Reporter Voicemail: What We Couldn't Print",
    description: "3-min voicemail from Mitchel Turner on the downtown vote backroom deals",
    duration: "3:12",
    voicemailNumber: "(951) 555-0142",
    transcript:
      "Hey, it's Mitchel. The council vote wasn't as clean as it looked. Three members met privately with developers the week before. We couldn't put names in print yet, but followers deserve to know we're still digging...",
  },
  {
    id: "a2",
    title: "Investigation Hotline Drop #2",
    description: "EPA source speaks on creek samples — followers only",
    duration: "5:48",
    voicemailNumber: "(951) 555-0199",
    transcript:
      "This is an anonymous tip line recording. Site 7 readings were known internally for 14 months before our FOIA request. Full lab docs are in the exclusive report...",
  },
  {
    id: "a3",
    title: "School Board Voicemail: Cuts on the Table",
    description: "Superintendent's after-hours message on what the parcel tax vote means for families",
    duration: "2:05",
    voicemailNumber: "(951) 555-0177",
    transcript:
      "This is Dr. Nguyen. If the parcel tax fails in November, we lose art and music first. Parents deserve to hear what's actually on the chopping block before the vote — full breakdown in the school board report...",
  },
];

export const SCARCITY_DROP: ScarcityDrop = {
  id: "restaurant-menus",
  title: "Restaurant Row Menu PDF Drop",
  description: "Full menus from all 4 opening restaurants — tonight only for the first verified followers",
  totalSpots: 200,
  assetLabel: "Restaurant Row Menu Pack (PDF)",
};

export const RECRUITMENT_CAMPAIGN: RecruitmentCampaign = {
  id: "release-investigation",
  title: "Community-Powered Release",
  description: "Help us hit 500 verified Facebook followers to automatically release the full PeaceHealth dossier to everyone",
  targetFollows: 500,
  unlockStoryId: INVESTIGATION_POST_ID,
  unlockLabel: "Full PeaceHealth Dossier & Document Timeline",
};

export const BUSINESS_PARTNERS: BusinessPartner[] = [
  {
    id: "kims-table",
    name: "Kim's Table",
    checkInCode: "KIM2026",
    unlockStoryId: "harbor-expansion",
    perk: "Unlock Restaurant Row preview + 10% off opening week",
    address: "412 Maple Street",
  },
  {
    id: "ember-oak",
    name: "Ember & Oak",
    checkInCode: "EMBER26",
    unlockStoryId: "harbor-expansion",
    perk: "Unlock insider menu preview",
    address: "418 Maple Street",
  },
];

export const ALUMNI_CLASSES: AlumniClass[] = [
  { year: "2003", label: "Class of 2003", storyId: "school-board" },
  { year: "2008", label: "Class of 2008", storyId: "school-board" },
  { year: "2015", label: "Class of 2015", storyId: "school-board" },
  { year: "2026", label: "Class of 2026", storyId: "school-board" },
];

export const ROLE_DEFINITIONS: RoleDefinition[] = [
  { id: "reader", name: "Reader", icon: "📖", description: "Free news consumer", requirement: `Join ${SITE_NAME}` },
  { id: "scout", name: "Scout", icon: "🔭", description: "Tips and questions that shape stories", requirement: "Submit 1 local question" },
  { id: "witness", name: "Witness", icon: "📸", description: "On-the-ground check-ins and tips", requirement: "Check in at a partner business" },
  { id: "advocate", name: "Advocate", icon: "📣", description: "Recruits verified followers", requirement: "Refer 3 verified followers" },
  { id: "insider", name: "Insider", icon: "💎", description: "Full access + early everything", requirement: "Verified follow + Advocate status" },
];

export const MYSTERY_SERIAL: MysterySerial = {
  id: "creek-mystery",
  title: "The Dossier Files",
  description: "A 7-day mystery investigation into the PeaceHealth story. One clue per day for followers. Refer a friend for bonus clues.",
  finaleStoryId: INVESTIGATION_POST_ID,
  clues: [
    { day: 1, title: "Clue 1: The Memo", content: "An internal email dated March 2023 mentions staffing concerns — no public advisory followed." },
    { day: 2, title: "Clue 2: The Board Packet", content: "Hospital board minutes reference wait times off-island months before the public Q&A." },
    { day: 3, title: "Clue 3: The FOIA Gap", content: "Three requested records were redacted under an exemption residents weren't told about." },
    { day: 4, title: "Clue 4: The Silence", content: "Borough health liaison declined four interview requests. Written statement only." },
    { day: 5, title: "Clue 5: The Timeline", content: "Internal staffing data existed 14 months before families reported referral delays." },
    { day: 6, title: "Clue 6: The Source", content: "A former administrator confirms decisions were known at the board level early." },
    { day: 7, title: "Clue 7: The Reckoning", content: "Full investigation unlocks for verified followers. The names are in the dossier." },
    { day: 0, title: "BONUS: Referrer Intel", content: "A whistleblower confirms two additional sampling sites not in the public record.", bonus: true },
  ],
};

export const QUESTION_UNLOCK_THRESHOLD = 10;
export const QUESTION_STORY_ID = INVESTIGATION_POST_ID;

export function getZoneByZip(zip: string): NeighborhoodZone | undefined {
  return NEIGHBORHOOD_ZONES.find((z) => z.zipCodes.includes(zip));
}

export function getPoll(id: string): LivePoll | undefined {
  return LIVE_POLLS.find((p) => p.id === id);
}
