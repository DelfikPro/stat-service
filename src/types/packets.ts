import { KensukeData } from '@/types/index';

export type UUID = string;

export type V0Frame = {
    type: string;
    data: Packet;
    uuid?: any;
};

export type V1Frame = {
    type: string;
    packet: Packet;
    talk: number;
};

export type IncomingFrame = V0Frame & V1Frame;

export type Packet = Record<any, any>;

export type Ok = { message: string };

/**
 * FATAL errors will shut the client down
 * Those are thrown whenever a client lacks some permissions and need to contact an admin to get them
 *
 * SEVERE
 *
 * WARNING
 *
 * TIMEOUT
 */
export type ErrorLevel = 'FATAL' | 'SEVERE' | 'WARNING' | 'TIMEOUT';

export type Error = {
    errorLevel: ErrorLevel;
    errorMessage: string;
};

export type KeepAlive = Record<any, any>;

/**
 * Auth packet is the first packet sent by kensuke clients
 */
export type Auth = {
    login: string;
    password: string;
    nodeName: string;
    version: number;
    activeSessions: string[];
};

export type UseScopes = {
    scopes: string[];
};

export type RequestLeaderboard = {
    scope: string;
    field: string;
    limit: number;
    extraIds: string[];
    extraScopes: string[];
};

export type LeaderboardState = {
    entries: any[];
};

export type LeaderboardEntry = {

    id: string;
    position: number;
    data: Record<string, any>;

};

/**
 * When a player attempts to join a realm, a session is created.
 * Session id is used to synchronize the data between statservice and minecraft servers
 */
export type CreateSession = {
    playerId: UUID;
    session: UUID;
    // realm: string;
    scopes: string[];
};

/**
 * When a player disconnects from a realm, the session is removed.
 * When the player has no sessions, the player is considered to be offline.
 */
export type EndSession = {
    session: UUID;
};

/**
 * Minecraft servers write the modified stats into statservice using this packet.
 * They can send data whenever they want, the only requirement is owning the active session.
 *
 * When a player joins a minecraft server, statservice also sends the stats using this packet.
 */
export type SyncData = {
    session: UUID;
    stats: KensukeData;
};

/**
 * Statservice will request data synchronization when player jumps from one realm to another.
 * It will do so using this packet.
 */
export type RequestSync = {
    session: UUID;
};

/**
 * Kensuke clients can request data snapshots without attaching the mutex.
 */
export type RequestSnapshot = {
    id: UUID;
    scopes: string[];
};

export type DataSnapshot = {
    id: UUID;
    stats: KensukeData;
};
