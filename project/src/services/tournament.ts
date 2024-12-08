import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { Tournament } from '../types';

export const createTournament = async (tournament: Omit<Tournament, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'tournaments'), tournament);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const joinTournament = async (tournamentId: string, userId: string) => {
  try {
    const tournamentRef = doc(db, 'tournaments', tournamentId);
    const tournamentDoc = await getDoc(tournamentRef);
    
    if (!tournamentDoc.exists()) {
      throw new Error('Tournament not found');
    }

    const tournament = tournamentDoc.data() as Tournament;
    
    if (tournament.participants.includes(userId)) {
      throw new Error('Already joined this tournament');
    }

    await updateDoc(tournamentRef, {
      participants: [...tournament.participants, userId]
    });
  } catch (error) {
    throw error;
  }
};