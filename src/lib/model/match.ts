export interface Match {
    id: number;
    team_one: Team;
    team_two: Team;
    scores: Score[];
    maps_info: MapInfo[];
    server?: Server;
    dathost_match?: string,
    completed_at?: number[], //this sucks, need to fix this serialization
}

export interface Server {
    id: number;
    match_series: number;
    server_id: string;
    hostname: string;
    game_port: number;
    gotv_port: number;
}


export interface Score {
    id: number;
    match_id: number;
    team_one_score: number;
    team_two_score: number;
}

export interface Team {
    id: number;
    role: number;
    name: string;
    capitan: number;
}

export interface MapInfo {
    map: string,
    picked_by: string,
    start_ct_team: string,
    start_t_team: string,
    completed: boolean,
}