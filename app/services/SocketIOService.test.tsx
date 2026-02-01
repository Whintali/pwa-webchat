import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRooms } from './SocketIOService';

vi.mock('@/socket-client', () => ({
  default: { id: 'mock-id', emit: vi.fn() }
}));



describe("fetchRooms", () => {
    beforeEach(()=> {
        vi.resetAllMocks();
    })
    it("Retourne les rooms avec la structure adéquate",async() => {
        const mockData = {
            BENGOUZ: {
            name: 'BENGOUZ',
            conversations: [],
            clients: {
                'idDuClient': {
                pseudo: 'Keke',
                id: 'idDuClient',
                roomName: 'BENGOUZ',
                initiator: true
                }
            },
            private: false
            }
        };

        global.fetch = vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve(mockData) } as any)
        );

        const rooms = await fetchRooms();
        const client = rooms.BENGOUZ.clients['idDuClient'];

        expect(client.pseudo).toBe('Keke');
        expect(client.id).toBe('idDuClient');
        expect(client.roomName).toBe('BENGOUZ');
        expect(client.initiator).toBe(true);
    })
    it("Retourne rien quand il y a une erreur", async () => {
        global.fetch = vi.fn(() => Promise.reject("network error"));

        const rooms = await fetchRooms();
        expect(rooms).toEqual({ data: {} });
    });

});
