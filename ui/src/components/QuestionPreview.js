import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../utils/StrictModeDroppable';
import QuestionPreviewItem from './QuestionPreviewItem';

function QuestionPreview({ questions, onQuestionsChange }) {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newQuestions = Array.from(questions);
    const [reorderedItem] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, reorderedItem);

    onQuestionsChange(newQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    onQuestionsChange(newQuestions);
  };

  return (
    <div className="bg-white shadow-md rounded px-4 py-6 mb-4">
      <h2 className="text-2xl font-bold mb-4">Survey Preview</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <QuestionPreviewItem
                  key={question.id}
                  question={question}
                  index={index}
                  onDelete={handleDeleteQuestion}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
}

export default QuestionPreview;
