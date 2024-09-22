import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical, Trash2 } from 'lucide-react';

function QuestionPreviewItem({ question, index, onDelete }) {
  return (
    <Draggable draggableId={question.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-6 border rounded relative bg-white flex"
        >
          <div
            {...provided.dragHandleProps}
            className="p-4 cursor-move flex items-center justify-center border-r"
          >
            <GripVertical size={20} />
          </div>
          <div className="flex-grow p-4">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold flex-grow">{question.text}</h3>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="mt-2">
              {question.type === 'multiple-choice' && (
                <div>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="mb-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        id={`question-${index}-option-${optionIndex}`}
                        className="mr-2"
                      />
                      <label htmlFor={`question-${index}-option-${optionIndex}`}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'checkbox-list' && (
                <div>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="mb-2">
                      <input
                        type="checkbox"
                        id={`question-${index}-option-${optionIndex}`}
                        className="mr-2"
                      />
                      <label htmlFor={`question-${index}-option-${optionIndex}`}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'short-text' && (
                <input
                  type="text"
                  placeholder="Short answer text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
              {question.type === 'long-text' && (
                <textarea
                  placeholder="Long answer text"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                ></textarea>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default QuestionPreviewItem;
