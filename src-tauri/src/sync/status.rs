pub enum SyncStatus {
    LocalNewer,
    RemoteNewer,
    InSync,
    LocalOnly,  // no remote file
    RemoteOnly, // no local file
    BothEmpty,  // first time setup
}
