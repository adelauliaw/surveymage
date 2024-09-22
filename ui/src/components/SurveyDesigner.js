import React, { useState, useRef, useEffect } from 'react';
import QuestionDesigner from './QuestionDesigner';
import QuestionPreview from './QuestionPreview';

function SurveyDesigner() {
  const [questions, setQuestions] = useState([]);
  const previewRef = useRef(null);

  const addQuestion = (question) => {
    const newQuestions = [...questions, { ...question, id: Date.now().toString() }];
    setQuestions(newQuestions);
    scrollToBottom();
  };

  const handleQuestionsChange = (newQuestions) => {
    setQuestions(newQuestions);
  };

  const scrollToBottom = () => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  };

  const handleSaveSurvey = () => {
    console.log('Saving survey:', questions);
  };

  const handleAnalyzeSurvey = () => {
    console.log('Analyzing survey:', questions);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]"> {/* Adjust height based on NavBar height */}
      <div className="w-1/3 p-4 overflow-y-auto">
        <QuestionDesigner 
          addQuestion={addQuestion} 
          onSaveSurvey={handleSaveSurvey}
          onAnalyzeSurvey={handleAnalyzeSurvey}
        />
      </div>
      <div className="w-2/3 p-4 overflow-y-auto" ref={previewRef}>
        <QuestionPreview 
          questions={questions} 
          onQuestionsChange={handleQuestionsChange}
        />
      </div>
    </div>
  );
}

export default SurveyDesigner;
