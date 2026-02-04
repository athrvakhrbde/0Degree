import React from "react";
import EmptyState from "../common/EmptyState";

type Props = {};

function NoPost({}: Props) {
  return (
    <EmptyState
      title="No Posts Yet"
      description="This user hasn't posted anything yet. Check back later!"
      minHeight="300px"
    />
  );
}

export default NoPost;
