// File: src/store/useGameStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type VehicleColor = 'Yellow' | 'Green' | 'Orange' | 'Purple' | 'Pink';

export type BonusConfig = {
  type: string;
  color: VehicleColor;
  points: number;
};

export type Player = {
  id: string;
  name: string;
  gameScore: number;
  bestScore: number;
};

export type HighScore = { name: string; score: number };

type GameState = {
  players: Player[];
  currentTurn: number;
  round: number;
  totalRounds: number;
  highScore: HighScore;
  bonusConfig: BonusConfig;
  bonusEnabled: boolean;
};

type GameActions = {
  addPlayer: (name?: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerName: (id: string, name: string) => void;
  startGame: () => void;
  tapVehicle: (base: number, rare: boolean) => void;
  endTurn: () => void;
  saveHighScore: () => void;
  setTotalRounds: (n: number) => void;
  setBonusEnabled: (on: boolean) => void;
  setBonusType: (t: string) => void;
  setBonusColor: (c: VehicleColor) => void;
  setBonusPoints: (p: number) => void;
  applyBonus: () => void;
};

export type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // initial state
      players: [],
      currentTurn: 0,
      round: 1,
      totalRounds: 3,
      highScore: { name: '', score: 0 },
      bonusConfig: { type: 'Car', color: 'Yellow', points: 2 },
      bonusEnabled: false,

      // actions
      addPlayer: (name = '') => {
        const newPlayer: Player = {
          id: Date.now().toString(),
          name,
          gameScore: 0,
          bestScore: 0,
        };
        set((state) => ({ players: [...state.players, newPlayer] }));
      },

      removePlayer: (id) =>
        set((state) => ({ players: state.players.filter((p) => p.id !== id) })),

      updatePlayerName: (id, name) =>
        set((state) => ({
          players: state.players.map((p) => (p.id === id ? { ...p, name } : p)),
        })),

      startGame: () =>
        set((state) => ({
          currentTurn: 0,
          round: 1,
          players: state.players.map((p) => ({ ...p, gameScore: 0 })),
        })),

      tapVehicle: (base, rare) =>
        set((state) => {
          const players = [...state.players];
          const idx = state.currentTurn;
          players[idx] = {
            ...players[idx],
            gameScore:
              players[idx].gameScore +
              base +
              (rare ? state.bonusConfig.points : 0),
          };
          return { players };
        }),

      endTurn: () =>
        set((state) => {
          const next = (state.currentTurn + 1) % state.players.length;
          const newRound = next === 0 ? state.round + 1 : state.round;
          return { currentTurn: next, round: newRound };
        }),

      saveHighScore: () => {
        const { players, highScore } = get();
        const contender = players.reduce<HighScore>(
          (best, p) =>
            p.gameScore > best.score
              ? { name: p.name, score: p.gameScore }
              : best,
          highScore,
        );
        if (contender.score > highScore.score) {
          set({ highScore: contender });
        }
      },

      setTotalRounds: (n) => set({ totalRounds: n }),

      setBonusEnabled: (on) => set({ bonusEnabled: on }),

      setBonusType: (type) =>
        set((state) => ({ bonusConfig: { ...state.bonusConfig, type } })),

      setBonusColor: (color) =>
        set((state) => ({ bonusConfig: { ...state.bonusConfig, color } })),

      setBonusPoints: (points) =>
        set((state) => ({ bonusConfig: { ...state.bonusConfig, points } })),

      applyBonus: () => {
        const { bonusConfig } = get();
        set((state) => {
          const players = [...state.players];
          const idx = state.currentTurn;
          players[idx] = {
            ...players[idx],
            gameScore: players[idx].gameScore + bonusConfig.points,
          };
          return { players };
        });
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        players: state.players,
        highScore: state.highScore,
        totalRounds: state.totalRounds,
        bonusConfig: state.bonusConfig,
        bonusEnabled: state.bonusEnabled,
      }),
    },
  ),
);
