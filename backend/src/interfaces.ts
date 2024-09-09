export interface ApiResponse {
    code: number;
    description: string;
}

export interface ApiLoginResponse extends ApiResponse {
    token: string;
}