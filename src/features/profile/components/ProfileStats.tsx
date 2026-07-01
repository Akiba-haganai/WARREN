import { StatBox } from "./StatBox";

interface Props {
  stats: { posts: number; comments: number; karma: number };
}

export function ProfileStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatBox label="Posts" value={stats.posts} />
      <StatBox label="Karma" value={stats.karma} />
      <StatBox label="Comments" value={stats.comments} />
    </div>
  );
}