import React from 'react'

const Logout = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
      };

  return (
    <Button variant="light" size="sm" onClick={handleLogout}>
          Logout
    </Button>
  )
}

export default Logout