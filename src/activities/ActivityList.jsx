import { deleteActivity } from "../api/activities";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

//instead of building the li here it calls activityEntry
export default function ActivityList({ activities, syncActivities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityEntry
          key={activity.id}
          activity={activity}
          syncActivities={syncActivities}
        />
      ))}
    </ul>
  );
}

//this calls useauth to get the token data so it can be used
//creates an error that can be set within the function
//and creates delete functionality that sets the error to null
//then calls the delete function wired up to the API
//finally it re-syncs the activities so they update
//if any errors are thrown they are then displayed.
function ActivityEntry({ activity, syncActivities }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setError(null);

    try {
      await deleteActivity(activity.id, token);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <li>
      <p>{activity.name}</p>
      {token && <button onClick={handleDelete}>Delete Activity</button>}
      {error && <p>{error}</p>}
    </li>
  );
}
