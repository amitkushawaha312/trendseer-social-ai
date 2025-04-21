
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Technical Documentation</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of the TrendSeer social media trend prediction system
            </p>
          </div>
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid grid-cols-4 h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="models">ML Models</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
            </TabsList>
            
            {/* Overview */}
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                    
                    <p className="text-muted-foreground mb-4">
                      TrendSeer is an AI-based social media trend prediction system that leverages big data analytics to forecast emerging trends across major social platforms. The system collects and analyzes data from platforms like Twitter, Instagram, TikTok, and YouTube to identify patterns and predict which content types, topics, and hashtags will gain popularity.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Key Components</h3>
                    
                    <ul className="space-y-2 list-disc pl-6 mb-6">
                      <li className="text-muted-foreground">
                        <span className="font-medium text-foreground">Data Collection Pipeline:</span> APIs and web scrapers to gather social media content and engagement metrics.
                      </li>
                      <li className="text-muted-foreground">
                        <span className="font-medium text-foreground">Data Processing:</span> Clean, normalize, and structure data for analysis.
                      </li>
                      <li className="text-muted-foreground">
                        <span className="font-medium text-foreground">Machine Learning Models:</span> Predictive algorithms that identify patterns and forecast trends.
                      </li>
                      <li className="text-muted-foreground">
                        <span className="font-medium text-foreground">Interactive Dashboard:</span> Visualization and exploration of trends and predictions.
                      </li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Project Scope</h3>
                    
                    <p className="text-muted-foreground mb-4">
                      This college project demonstrates the technical concepts of social media trend prediction while maintaining a feasible scope:
                    </p>
                    
                    <ul className="space-y-2 list-disc pl-6 mb-6">
                      <li className="text-muted-foreground">
                        Uses pre-collected data to avoid API rate limiting and authentication complexities
                      </li>
                      <li className="text-muted-foreground">
                        Focuses on a limited set of trend categories for more accurate predictions
                      </li>
                      <li className="text-muted-foreground">
                        Implements core ML algorithms without requiring extensive computational resources
                      </li>
                      <li className="text-muted-foreground">
                        Provides a functional user interface to visualize and interact with the predictions
                      </li>
                    </ul>
                    
                    <div className="bg-muted/30 p-4 rounded-lg border mt-6">
                      <h4 className="font-semibold mb-2">Project Goals</h4>
                      <ol className="space-y-2 list-decimal pl-6">
                        <li className="text-sm text-muted-foreground">Demonstrate the practical application of big data analytics in social media analysis</li>
                        <li className="text-sm text-muted-foreground">Implement and evaluate machine learning algorithms for trend prediction</li>
                        <li className="text-sm text-muted-foreground">Create an intuitive visualization system for trend analysis</li>
                        <li className="text-sm text-muted-foreground">Showcase the potential of predictive analytics for content strategy</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Architecture */}
            <TabsContent value="architecture" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">System Architecture</h2>
                    
                    <p className="text-muted-foreground mb-6">
                      TrendSeer follows a modular architecture with clearly defined components that handle different aspects of the trend prediction process.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Data Collection Layer</h3>
                    
                    <div className="mb-6">
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Social Media APIs:</span> Interfaces with Twitter API, Instagram Graph API, TikTok API, and YouTube Data API.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Data Scrapers:</span> Custom scrapers for platforms with limited API access.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Collection Scheduler:</span> Manages API rate limits and schedules regular data collection.
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Data Processing Layer</h3>
                    
                    <div className="mb-6">
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Data Cleaning:</span> Remove duplicates, handle missing values, and normalize data formats.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Feature Extraction:</span> Extract relevant features like hashtags, keywords, engagement metrics, etc.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Sentiment Analysis:</span> Analyze sentiment of text content using NLP techniques.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Data Storage:</span> Organize processed data in a structured database for efficient retrieval.
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Analytics Layer</h3>
                    
                    <div className="mb-6">
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Trend Identification:</span> Algorithms to detect emerging patterns in the data.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Prediction Models:</span> Machine learning models that forecast trend trajectories.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Evaluation System:</span> Metrics to assess prediction accuracy and model performance.
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Presentation Layer</h3>
                    
                    <div className="mb-6">
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Interactive Dashboard:</span> Frontend application for visualizing trends and predictions.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Data Visualization:</span> Charts, graphs, and interactive components to explore the data.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Filtering and Search:</span> Tools to navigate and refine the trend information.
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg border mt-6">
                      <h4 className="font-semibold mb-2">Technology Stack</h4>
                      <ul className="space-y-1 list-none pl-0">
                        <li className="text-sm text-muted-foreground"><span className="font-medium">Frontend:</span> React, Tailwind CSS, Recharts</li>
                        <li className="text-sm text-muted-foreground"><span className="font-medium">Backend:</span> Python (Flask/Django), Node.js</li>
                        <li className="text-sm text-muted-foreground"><span className="font-medium">Data Processing:</span> Pandas, NumPy, NLTK</li>
                        <li className="text-sm text-muted-foreground"><span className="font-medium">Machine Learning:</span> Scikit-learn, TensorFlow, Keras</li>
                        <li className="text-sm text-muted-foreground"><span className="font-medium">Database:</span> MongoDB, PostgreSQL</li>
                        <li className="text-sm text-muted-foreground"><span className="font-medium">Deployment:</span> Docker, AWS/Azure/GCP</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* ML Models */}
            <TabsContent value="models" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Machine Learning Models</h2>
                    
                    <p className="text-muted-foreground mb-6">
                      TrendSeer employs several machine learning models to analyze social media data and predict emerging trends.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Time Series Analysis</h3>
                    
                    <div className="mb-6">
                      <p className="text-muted-foreground mb-2">
                        Time series models are used to forecast trend popularity based on historical engagement data:
                      </p>
                      
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">ARIMA (AutoRegressive Integrated Moving Average):</span> For forecasting trend trajectories based on past values.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Prophet:</span> Facebook's time series forecasting tool that handles seasonality and special events.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Exponential Smoothing:</span> For trends with clear seasonal patterns or cyclical behaviors.
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Classification and Regression</h3>
                    
                    <div className="mb-6">
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Random Forest:</span> Classifies content into trend potential categories.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Gradient Boosting:</span> Predicts the growth rate of emerging trends.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Linear Regression:</span> Used for simple trend trajectory prediction.
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Natural Language Processing</h3>
                    
                    <div className="mb-6">
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">BERT:</span> Analyzes content semantics to identify related topics and themes.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Sentiment Analysis:</span> Classifies content sentiment as positive, negative, or neutral.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Topic Modeling:</span> LDA (Latent Dirichlet Allocation) to identify emerging topics in content.
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Ensemble Methods</h3>
                    
                    <div className="mb-6">
                      <p className="text-muted-foreground mb-2">
                        For final predictions, TrendSeer combines multiple models using ensemble techniques:
                      </p>
                      
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Voting Classifier:</span> Combines predictions from multiple classification models.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Stacking:</span> Uses a meta-model to combine base model predictions.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Weighted Averaging:</span> Assigns different weights to models based on their historical accuracy.
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Evaluation Metrics</h3>
                    
                    <div className="mb-6">
                      <p className="text-muted-foreground mb-2">
                        The system uses several metrics to evaluate prediction performance:
                      </p>
                      
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">RMSE (Root Mean Square Error):</span> Measures prediction accuracy.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">MAE (Mean Absolute Error):</span> Average magnitude of errors without considering direction.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">MAPE (Mean Absolute Percentage Error):</span> Error relative to the actual value.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">R² Score:</span> Proportion of variance in the dependent variable predictable from independent variables.
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg border mt-6">
                      <h4 className="font-semibold mb-2">Model Training Pipeline</h4>
                      <ol className="space-y-1 list-decimal pl-6">
                        <li className="text-sm text-muted-foreground">Data collection and preprocessing</li>
                        <li className="text-sm text-muted-foreground">Feature engineering and selection</li>
                        <li className="text-sm text-muted-foreground">Model training with cross-validation</li>
                        <li className="text-sm text-muted-foreground">Hyperparameter tuning using grid search</li>
                        <li className="text-sm text-muted-foreground">Ensemble model creation</li>
                        <li className="text-sm text-muted-foreground">Evaluation on test data</li>
                        <li className="text-sm text-muted-foreground">Deployment and continuous retraining</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Implementation */}
            <TabsContent value="implementation" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Implementation Guide</h2>
                    
                    <p className="text-muted-foreground mb-6">
                      This section provides guidance on implementing and extending the TrendSeer system.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Project Setup</h3>
                    
                    <div className="mb-6">
                      <ol className="space-y-2 list-decimal pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Environment Setup:</span> Install Node.js, Python, and required dependencies.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">API Keys:</span> Obtain API keys for social media platforms you want to analyze.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Database Configuration:</span> Set up MongoDB or PostgreSQL for data storage.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Frontend Setup:</span> Install React and required UI libraries.
                        </li>
                      </ol>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Data Collection Implementation</h3>
                    
                    <div className="mb-6">
                      <p className="text-muted-foreground mb-2">
                        To implement data collection from social media platforms:
                      </p>
                      
                      <div className="bg-muted/30 p-4 rounded-lg border my-4 overflow-x-auto">
                        <pre className="text-xs"><code>{`# Python example for Twitter API data collection
import tweepy
import pandas as pd
from datetime import datetime, timedelta

def collect_twitter_data(api_key, api_secret, access_token, access_secret, search_terms, days=7):
    # Authentication
    auth = tweepy.OAuthHandler(api_key, api_secret)
    auth.set_access_token(access_token, access_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    
    # Calculate date range
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    
    # Format dates for Twitter API
    end_date_str = end_date.strftime('%Y-%m-%d')
    start_date_str = start_date.strftime('%Y-%m-%d')
    
    # Collect tweets
    tweets = []
    for term in search_terms:
        query = f"{term} since:{start_date_str} until:{end_date_str}"
        search_results = tweepy.Cursor(api.search_tweets, q=query, tweet_mode='extended').items(500)
        
        for tweet in search_results:
            tweet_data = {
                'id': tweet.id_str,
                'created_at': tweet.created_at,
                'text': tweet.full_text,
                'user': tweet.user.screen_name,
                'retweets': tweet.retweet_count,
                'favorites': tweet.favorite_count,
                'search_term': term
            }
            tweets.append(tweet_data)
    
    # Convert to DataFrame
    df = pd.DataFrame(tweets)
    return df`}</code></pre>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Model Training Implementation</h3>
                    
                    <div className="mb-6">
                      <p className="text-muted-foreground mb-2">
                        Example of implementing a trend prediction model:
                      </p>
                      
                      <div className="bg-muted/30 p-4 rounded-lg border my-4 overflow-x-auto">
                        <pre className="text-xs"><code>{`# Python example for trend prediction model
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

def train_trend_prediction_model(data):
    # Prepare features
    features = ['engagement_rate', 'growth_rate', 'sentiment_score', 'day_of_week', 'hour_of_day']
    X = data[features]
    y = data['future_popularity']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    print(f"Model MAE: {mae}")
    
    return model

def predict_future_trends(model, new_data):
    # Make predictions on new data
    predictions = model.predict(new_data)
    return predictions`}</code></pre>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Implementation Challenges</h3>
                    
                    <div className="mb-6">
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">API Rate Limits:</span> Implement rate limiting and batching to handle API restrictions.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Data Volume:</span> Use data sampling and efficient storage strategies for large datasets.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Model Accuracy:</span> Regularly retrain models with new data to maintain prediction accuracy.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Real-time Processing:</span> Implement streaming data processing for more timely predictions.
                        </li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Scope Limitations for College Project</h3>
                    
                    <div className="mb-6">
                      <ul className="space-y-2 list-disc pl-6">
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Use Pre-collected Datasets:</span> Instead of real-time API calls, work with pre-collected data.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Focus on Limited Platforms:</span> Analyze 2-3 major platforms instead of all social media.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Simplified Models:</span> Start with basic predictive models and add complexity gradually.
                        </li>
                        <li className="text-muted-foreground">
                          <span className="font-medium text-foreground">Static Dashboard:</span> Implement a functional but non-real-time frontend.
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg border mt-6">
                      <h4 className="font-semibold mb-2">Next Steps for Extension</h4>
                      <ol className="space-y-1 list-decimal pl-6">
                        <li className="text-sm text-muted-foreground">Implement real-time data collection from additional platforms</li>
                        <li className="text-sm text-muted-foreground">Add more sophisticated machine learning models</li>
                        <li className="text-sm text-muted-foreground">Develop a recommendation system based on trend predictions</li>
                        <li className="text-sm text-muted-foreground">Create API endpoints for external services to use predictions</li>
                        <li className="text-sm text-muted-foreground">Implement user accounts and personalized trend tracking</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documentation;
