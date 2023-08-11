<?php
include_once "cek-akses.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Admin</title>
        <style>
            table {
                border: 1px solid #ddd;
                border-collapse: collapse;
                width: 50%;
            }

            table td, table th {
                border: 1px solid #ddd;
                padding: 8px
            }
        </style>
    </head>
    <body>
        <h1>Selamat Datang</h1>
        <p>
        <a href="tambah-user.php">Tambah User</a> | <a href="logout.php">Logout</a>
        </p>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Aktif</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $pdo = include "koneksi.php";
                $query = $pdo->prepare("select id,nama,aktif,role from users");
                $query->execute();
                while($user = $query->fetch()) {
                ?>
                <tr>
                    <td><?php echo $user['id'];?></td>
                    <td><?php echo $user['nama'];?></td>
                    <td><?php echo $user['aktif'];?></td>
                    <td><?php echo $user['role'];?></td>
                </tr>
                <?php }?>
            </tbody>
        </table>
    </body>
</html>