'use server';

import OpenAI from 'openai';
import prisma from './db';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


  export const generateTourResponse = async ({ city,  country }) => {
    const query = `Provide data for a level ${city} ESL lesson with the main 
    grammar focus being ${country}.
  
    The response should be  in the following JSON format: 
  
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "title of the lesson",
      "description": " short explination of the grammar of ${country}",

      "titleForExamples": "short title for examples", 
      "examples": ["example sentence 1 ", "example sentence 2","examle sentence 3"], 

      "titleFillBlanks" : "short title for a fill in the blanks activity",
      "fillBlanks" : ["activity 1", "activity 2", activity 3"],

      "titleOneReading" : "short title about the reading activity",
      "oneReading" : "generate a paragraph for a reading activity", 
      "oneReadingQuestions" ["question 1". "question 2"],

      "titleTwoReading" : "short title about the reading activity",
      "twoReading" : "generate a paragraph for a reading activity", 
      "twoReadingQuestions" ["question 1". "question 2"],

      "titleThreeReading" : "short title about the reading activity",
      "threeReading" : "generate a paragraph for a reading activity", 
      "threeReadingQuestions" ["question 1". "question 2"],

      "titleConclusion" : "short title about the conclusion",
      "conclusion" : "a description of the activities viewed and the lesson objectives" 

      
      
    }
  }

  Follow the following instructions to construct the JSON file: 

  First, the description key should explain the main uses of the grammar focus. 
  
  Second, there should be 5 examples displayed. 

  Third, there should be 10 fill in the blancks activities in the fillBlanks key. 
  Display two answers for the fill in the blanks activity in paranthesis next to the each sentence
  so the student can choose the correct one. Switch the order of the correct question around
  so it wont always be in the same spot. Make this particular activity dificult.

  Fourth, the oneReading key should contain a paragraph long text at a ${city} reading level 
  about an interesting topic. Additionally, as two comprehension questions for the
  oneReadingQuestions key.  

  Fifth, the twoReading and threeReading keys should have the same characteristics as its predecessor.   

  
  `;
  
    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'you are a ESL instructor' },
          { role: 'user', content: query },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0,
      });
      // potentially returns a text with error message
      const tourData = JSON.parse(response.choices[0].message.content);
  
      if (!tourData.tour) {
        return null;
      }
  
      return tourData.tour;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

  export const getExistingTour = async ({ city, country }) => {
    return prisma.tour.findUnique({
      where: {
        city_country: {
          city,
          country,
        },
      },
    });
  };
  
  export const createNewTour = async (tour) => {
    return prisma.tour.create({
      data: tour,
    });
  };


  export const getAllTours = async (searchTerm) => {
    if (!searchTerm) {
      const tours = await prisma.tour.findMany({
        orderBy: {
          city: 'asc',
        },
      });
  
      return tours;
    }
  
    const tours = await prisma.tour.findMany({
      where: {
        OR: [
          {
            city: {
              contains: searchTerm,
            },
          },
          {
            country: {
              contains: searchTerm,
            },
          },
        ],
      },
      orderBy: {
        city: 'asc',
      },
    });
    return tours;
  };  

  export const getSingleTour = async (id) => {
    return prisma.tour.findUnique({
      where: {
        id,
      },
    });
  };