import {
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase/firestore';
import { TGoal } from '../../type';

export const goalConverter = {
  toFirestore(facilityStaff: WithFieldValue<TGoal>): DocumentData {
    return { ...facilityStaff };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): TGoal {
    const {
      completed,
      completionDate,
      createdAt,
      feelingAfterCompletion,
      goalName,
    } = snapshot.data();

    return {
      completed,
      completionDate: completionDate ? completionDate.toDate() : null,
      createdAt: createdAt ? createdAt.toDate() : null,
      feelingAfterCompletion: feelingAfterCompletion ?? null,
      goalName: goalName ?? null,
    };
  },
};
