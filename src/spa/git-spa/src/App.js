import './App.css';
import {ReposApi} from "./api/repos/repos-api";
import React from "react";

async function downloadFile(data, filename) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
}

function App() {
  const [allButtonReposStateLoader, setAllButtonReposStateLoader] = React.useState(false);
  const [repoByIdButtonStateLoader, setRepoByIdButtonStateLoader] = React.useState(false);
  const [repoByNameButtonStateLoader, setRepoByNameButtonStateLoader] = React.useState(false);
  const [runRepoForcePullButtonStateLoader, setRunRepoForcePullButtonStateLoader] = React.useState(false);

  async function getAllRepos() {
    try {
      setAllButtonReposStateLoader(true);
      const res = await ReposApi.getAllRepos();
      await downloadFile(res.data, res.fileName);
      setAllButtonReposStateLoader(false);
    } catch (error) {
      setAllButtonReposStateLoader(false);
      console.log(error);
      alert(`Error occurred while retrieving all repos: ${error.response.data.message.toLowerCase() || error.message.toLowerCase()}`);
    }
  }

  async function getRepoById() {
    const id = prompt('Write id to this input field: ');

    if (isNaN(parseInt(id))) {
      alert('Id must be a number');
      return;
    }

    try {
      setRepoByIdButtonStateLoader(true);
      const res = await ReposApi.getRepoById(id);
      await downloadFile(res.data, res.fileName);
      setRepoByIdButtonStateLoader(false);
    } catch (error) {
      setRepoByIdButtonStateLoader(false);
      console.log(error);
      alert(`Error occurred while retrieving repo: ${error.response.data.message.toLowerCase() || error.message.toLowerCase()}`);
    }
  }

  async function getRepoByName() {
    const name = prompt('Write name to this input field: ');

    try {
      setRepoByNameButtonStateLoader(true);
      const res = await ReposApi.getRepoByName(name);
      await downloadFile(res.data, res.fileName);
      setRepoByNameButtonStateLoader(false);
    } catch (error) {
      setRepoByNameButtonStateLoader(false);
      console.log(error);
      alert(`Error occurred while retrieving repo by name: ${error.response.data.message.toLowerCase() || error.message.toLowerCase()}`);
    }
  }

  async function runRepoForcePull() {
    try {
      setRunRepoForcePullButtonStateLoader(true);
      await ReposApi.runRepoForcePull();
      alert('Repo Worker successfully restarted')
      setRunRepoForcePullButtonStateLoader(false);
    } catch (error) {
      setRunRepoForcePullButtonStateLoader(false);
      console.log(error);
      alert(`${error.response?.data?.error?.toLowerCase() || 'Error occurred while running repo force pull: ' + error.message.toLowerCase()}`);
    }
  }

  function buttonLoader(state, text) {
    return !state ? text : '...'
  }

  return (
    <div className="App">
      <header className='App-header'>Simple GIT API Single Page Application</header>

      <main className='App-main'>
        <header> Choose an action with API </header>
        <button onClick={getAllRepos}>{buttonLoader(allButtonReposStateLoader, 'Get all repos')}</button>
        <button onClick={getRepoById}>{buttonLoader(repoByIdButtonStateLoader, 'Get Repo by id')} </button>
        <button onClick={getRepoByName}>{buttonLoader(repoByNameButtonStateLoader, 'Get Repo by name')} </button>
        <button onClick={runRepoForcePull}>{buttonLoader(runRepoForcePullButtonStateLoader, 'Run repo force pull')} </button>
      </main>

    </div>
  );
}

export default App;
