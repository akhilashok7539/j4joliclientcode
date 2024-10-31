import React  from 'react';
import Tag from './Tag';
function DisplayTags({ tagArray, onTagRemove }) {
  return (
    <div className="tag-list">
      {React.Children.toArray(tagArray.map((tag) => <Tag value={tag} onRemove={onTagRemove} />))}
    </div>
  );
}

export default DisplayTags;
