-- seed.sql

USE `serverdb`;

-- Insert data into the `backupstatus` table
INSERT INTO `backupstatus` (`id`, `IP`, `Status`, `LastUpdate`) VALUES
(1, '192.168.1.1', 'OK', '2023-09-06 12:00:00'),
(2, '192.168.1.2', 'Error', '2023-09-06 13:00:00');

-- Insert data into the `servers` table
INSERT INTO `servers` (`id`, `ServerName`, `IP`, `Drive`, `Size`, `SizeFree`, `SizeUsed`, `PercentFree`, `TotalMemory`, `FreeMemory`, `UsedMemory`, `OnlineVPS`, `OfflineVPS`, `LastUpdate`, `ServerUptime`) VALUES
(1, 'Server1', '192.168.1.1', '/dev/sda', 100, 50, 50, 50, 4096, 2048, 2048, 5, 2, '2023-09-06 12:00:00', 7200),
(2, 'Server2', '192.168.1.2', '/dev/sdb', 200, 100, 100, 50, 8192, 4096, 4096, 10, 1, '2023-09-06 13:00:00', 14400);

-- Insert data into the `users` table
INSERT INTO `users` (`id`, `Name`, `Email`, `Password`, `isAdmin`, `Company`) VALUES
(1, 'Vyashya Raj', 'vyashya@exabytes.com', '$2b$10$zto345dqMTq308rNrbQkXe.s4uhtWz4ooQldV0/q9XzPD6NSryoTK', 1, 'Exabytes'),
(2, 'David', 'david@exabytes.com', '$2b$10$JNwQUvXh3lcFNWbTPCxIouZkICiSBMQ2eR7I1GQTazWEwczq55Up6', 1, 'Exabytes');
