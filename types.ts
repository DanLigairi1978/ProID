export enum CardFormat {
  CR80 = 'CR80 (Standard)',
  CR79 = 'CR79 (Small)',
  CR100 = 'CR100 (Oversized)',
}

export enum TemplateStyle {
  A = 'Style A',
  B = 'Style B',
  C = 'Style C',
  D = 'Style D',
}

export enum PlayerPosition {
  LOOSEHEAD_PROP = 'Loosehead Prop',
  HOOKER = 'Hooker',
  TIGHTHEAD_PROP = 'Tighthead Prop',
  LOCK = 'Lock',
  BLINDSIDE_FLANKER = 'Blindside Flanker',
  OPENSIDE_FLANKER = 'Openside Flanker',
  NUMBER_EIGHT = 'Number Eight',
  SCRUM_HALF = 'Scrum-Half',
  FLY_HALF = 'Fly-Half',
  LEFT_WING = 'Left Wing',
  INSIDE_CENTRE = 'Inside Centre',
  OUTSIDE_CENTRE = 'Outside Centre',
  RIGHT_WING = 'Right Wing',
  FULLBACK = 'Fullback',
}

export interface PlayerData {
  playerImage: string | null;
  fullName: string;
  dob: string;
  teamName: string;
  address: string;
  position: PlayerPosition;
  twitterHandle?: string;
  instagramHandle?: string;
}

export interface CardConfig {
  cardFormat: CardFormat;
  template: TemplateStyle;
  primaryColor: string;
  secondaryColor: string;
}

export interface TemplateColor {
  primary: string;
  secondary: string;
  name: string;
  style: TemplateStyle;
}