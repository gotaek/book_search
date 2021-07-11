import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBarHeader from './components/SearchBarHeader';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
const App = () => {
  return (
    <>
      <Router>
        <SearchBarHeader />
        <div className="contents">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
