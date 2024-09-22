import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Plus, Save, BarChart2 } from 'lucide-react';

function QuestionDesigner({ addQuestion, onSaveSurvey, onAnalyzeSurvey }) {
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion({
      type: questionType,
      text: questionText,
      options: questionType === 'multiple-choice' || questionType === 'checkbox-list' ? options : [],
      questionTypeText: getQuestionTypeText(questionType),
    });
    setQuestionText('');
    setOptions(['']);
  };

  const getQuestionTypeText = (type) => {
    switch (type) {
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'checkbox-list':
        return 'Checkbox List';
      case 'short-text':
        return 'Short Answer';
      case 'long-text':
        return 'Long Answer';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-4 py-6 mb-4 sticky top-0">
      <div className="flex mb-4 space-x-2"> {/* Added space-x-2 for gap */}
        <button
          onClick={onSaveSurvey}
          className="bg-cool-blue-500 hover:bg-cool-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
        >
          <Save size={20} className="mr-6" />
          Save Survey
        </button>
        <button
          onClick={onAnalyzeSurvey}
          className="bg-cool-blue-500 hover:bg-cool-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
        >
          <BarChart2 size={20} className="mr-4" />
          Analyze
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4 text-cool-blue-800">Design Your Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question-type">
            Question Type:
          </label>
          <select
            id="question-type"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="checkbox-list">Checkbox List</option>
            <option value="short-text">Short Text</option>
            <option value="long-text">Long Text</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question-text">
            Question Text:
          </label>
          <input
            type="text"
            id="question-text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {(questionType === 'multiple-choice' || questionType === 'checkbox-list') && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Options:</h3>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  <MinusCircle size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="bg-cool-blue-500 hover:bg-cool-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <PlusCircle size={20} className="inline-block mr-2" />
              Add Option
            </button>
          </div>
        )}
        <button
          type="submit"
          className="bg-cool-blue-600 hover:bg-cool-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <Plus size={20} className="inline-block mr-2" />
          Add Question to Survey
        </button>
      </form>
    </div>
  );
}

export default QuestionDesigner;
