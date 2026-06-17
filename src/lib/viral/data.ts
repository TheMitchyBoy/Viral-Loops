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

export const NEIGHBORHOOD_ZONES: NeighborhoodZone[] = [
  {
    id: "oak-street",
    name: "Oak Street / Downtown",
    zipCodes: ["92501", "92502"],
    threshold: 15,
    storyId: "3",
    storyTitle: "Creek Contamination Investigation",
    color: "#ed751a",
  },
  {
    id: "creek-view",
    name: "Creek View Lane",
    zipCodes: ["92503"],
    threshold: 10,
    storyId: "3",
    storyTitle: "Creek Contamination Investigation",
    color: "#059669",
  },
  {
    id: "riverside-high",
    name: "Riverside High Area",
    zipCodes: ["92504"],
    threshold: 20,
    storyId: "2",
    storyTitle: "State Championship Full Highlights",
    color: "#2563eb",
  },
  {
    id: "maple-row",
    name: "Restaurant Row / Maple",
    zipCodes: ["92505", "92506"],
    threshold: 12,
    storyId: "6",
    storyTitle: "Restaurant Row Insider Preview",
    color: "#9333ea",
  },
  {
    id: "central-park",
    name: "Central Park / Market",
    zipCodes: ["92507"],
    threshold: 8,
    storyId: "4",
    storyTitle: "Farmers Market Expansion Guide",
    color: "#dc2626",
  },
];

export const LIVE_POLLS: LivePoll[] = [
  {
    id: "poll-contamination",
    storyId: "3",
    title: "Contamination Investigation Vote",
    question: "Should we publish the names of agencies that withheld creek contamination data?",
    options: [
      { id: "publish", label: "Yes — full transparency" },
      { id: "redact", label: "Redact names, publish findings" },
      { id: "wait", label: "Wait for official response first" },
    ],
    endsAt: "2026-06-20T23:59:59Z",
    unlockStoryId: "3",
  },
];

export const AUDIO_DROPS: AudioDrop[] = [
  {
    id: "a1",
    title: "Reporter Voicemail: What We Couldn't Print",
    description: "3-min voicemail from Sarah Chen on the downtown vote backroom deals",
    duration: "3:12",
    voicemailNumber: "(951) 555-0142",
    transcript:
      "Hey, it's Sarah. The council vote wasn't as clean as it looked. Three members met privately with developers the week before. We couldn't put names in print yet, but followers deserve to know we're still digging...",
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
    title: "Locker Room Audio: Championship Night",
    description: "Unfiltered coach speech after Riverside High's state win",
    duration: "2:05",
    voicemailNumber: "(951) 555-0177",
    transcript:
      "Coach Williams to the team: 'Twenty-three years. You did this for every Tiger who came before you.' Followers get the full uncut version...",
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
  description: "Help us hit 500 verified Facebook followers to automatically release the full EPA lab results to everyone",
  targetFollows: 500,
  unlockStoryId: "3",
  unlockLabel: "Full EPA Lab Results & Contamination Map",
};

export const BUSINESS_PARTNERS: BusinessPartner[] = [
  {
    id: "kims-table",
    name: "Kim's Table",
    checkInCode: "KIM2026",
    unlockStoryId: "6",
    perk: "Unlock Restaurant Row preview + 10% off opening week",
    address: "412 Maple Street",
  },
  {
    id: "ember-oak",
    name: "Ember & Oak",
    checkInCode: "EMBER26",
    unlockStoryId: "6",
    perk: "Unlock insider menu preview",
    address: "418 Maple Street",
  },
];

export const ALUMNI_CLASSES: AlumniClass[] = [
  { year: "2003", label: "Class of 2003 — Last championship", storyId: "2" },
  { year: "2008", label: "Class of 2008", storyId: "2" },
  { year: "2015", label: "Class of 2015", storyId: "2" },
  { year: "2026", label: "Class of 2026 — Current team", storyId: "2" },
];

export const ROLE_DEFINITIONS: RoleDefinition[] = [
  { id: "reader", name: "Reader", icon: "📖", description: "Free news consumer", requirement: "Join Riverside Daily" },
  { id: "scout", name: "Scout", icon: "🔭", description: "Tips and questions that shape stories", requirement: "Submit 1 local question" },
  { id: "witness", name: "Witness", icon: "📸", description: "On-the-ground check-ins and tips", requirement: "Check in at a partner business" },
  { id: "advocate", name: "Advocate", icon: "📣", description: "Recruits verified followers", requirement: "Refer 3 verified followers" },
  { id: "insider", name: "Insider", icon: "💎", description: "Full access + early everything", requirement: "Verified follow + Advocate status" },
];

export const MYSTERY_SERIAL: MysterySerial = {
  id: "creek-mystery",
  title: "The Creek Files",
  description: "A 7-day mystery investigation. One clue per day for followers. Refer a friend for bonus clues.",
  finaleStoryId: "3",
  clues: [
    { day: 1, title: "Clue 1: The Memo", content: "An internal email dated March 12, 2024 mentions 'elevated readings at Site 7' — no public notice followed." },
    { day: 2, title: "Clue 2: The Map", content: "Site 7 sits 400 feet from Oak Street bridge. Three families live within 200 feet." },
    { day: 3, title: "Clue 3: The Number", content: "340 ppm lead. EPA residential limit: 120 ppm." },
    { day: 4, title: "Clue 4: The Silence", content: "County env director declined 4 interview requests. Written statement only." },
    { day: 5, title: "Clue 5: The Timeline", content: "Agency knew 14 months before our FOIA. Residents: 0 notifications." },
    { day: 6, title: "Clue 6: The Source", content: "Meridian Industrial Park runoff channel drains directly into Riverside Creek." },
    { day: 7, title: "Clue 7: The Reckoning", content: "Full investigation unlocks for verified followers. The names are in the report." },
    { day: 0, title: "BONUS: Referrer Intel", content: "A whistleblower confirms two additional sampling sites not in the public record.", bonus: true },
  ],
};

export const QUESTION_UNLOCK_THRESHOLD = 10;
export const QUESTION_STORY_ID = "3";

export function getZoneByZip(zip: string): NeighborhoodZone | undefined {
  return NEIGHBORHOOD_ZONES.find((z) => z.zipCodes.includes(zip));
}

export function getPoll(id: string): LivePoll | undefined {
  return LIVE_POLLS.find((p) => p.id === id);
}
