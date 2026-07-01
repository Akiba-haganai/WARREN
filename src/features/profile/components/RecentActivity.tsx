import { useNavigate } from "react-router-dom";
import { ActivityCard } from "./ActivityCard";

interface Props {
  activities: { posts: any[]; comments: any[] };
  userId?: string;
}

export function RecentActivity({ activities, userId }: Props) {
  const navigate = useNavigate();
  const previewPosts = activities.posts.slice(0, 2);
  const previewComments = activities.comments.slice(0, 2);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-lg">Recent Activity</h2>
        {activities.posts.length > 2 || activities.comments.length > 2 ? (
          <button
            onClick={() => navigate(`/profile/${userId}/discussions`)}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium"
          >
            View all
          </button>
        ) : null}
      </div>
      <div className="space-y-2">
        {previewPosts.map((post) => (
          <ActivityCard key={post.id} type="post" content={post.content} date={post.created_at} />
        ))}
        {previewComments.map((comment) => (
          <ActivityCard key={comment.id} type="comment" content={comment.content} date={comment.created_at} />
        ))}
        {previewPosts.length === 0 && previewComments.length === 0 && (
          <p className="text-sm opacity-60">No recent activity</p>
        )}
      </div>
    </div>
  );
}