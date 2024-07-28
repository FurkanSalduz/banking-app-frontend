import React, { useState } from "react";
import AccountList from "../components/AccountList";
import Transactions from "../components/Transactions";

function AccountPage() {
  const [refresh, setRefresh] = useState(false);

  const handleUpdate = () => {
    setRefresh((prev) => !prev); // para gönderildiğinde ön yüze hemen yansımasını sağlar
  };

  return (
    <div>
      <AccountList onUpdate={handleUpdate} />
      <Transactions onUpdate={handleUpdate} />
    </div>
  );
}

export default AccountPage;
