import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit 
} from 'firebase/firestore';
import { Tournament } from '../types';
import { findMatchingBot } from './bot';

export const createTournament = async (isVirtual: boolean = true) => {
  const startTime = new Date(Math.ceil(new Date().getTime() / 3600000) * 3600000);
  
  const tournament: Omit<Tournament, 'id'> = {
    startTime,
    entryFee: isVirtual ? 1 : 3,
    isVirtual,
    participants: [],
    status: 'upcoming',
    prizes: {
      first: 0,
      second: 0,
      third: 0
    },
    matches: [],
    standings: []
  };

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

    const newParticipants = [...tournament.participants, userId];
    const totalPrizePool = newParticipants.length * tournament.entryFee;
    
    await updateDoc(tournamentRef, {
      participants: newParticipants,
      prizes: {
        first: totalPrizePool * 0.5,
        second: totalPrizePool * 0.3,
        third: totalPrizePool * 0.2
      }
    });

    // Add bots if needed for virtual tournaments
    if (tournament.isVirtual && newParticipants.length < 4) {
      const botsNeeded = 4 - newParticipants.length;
      for (let i = 0; i < botsNeeded; i++) {
        const bot = findMatchingBot(1200); // Default rating
        await updateDoc(tournamentRef, {
          participants: [...newParticipants, bot.id]
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('rating', 'desc'), limit(10));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};