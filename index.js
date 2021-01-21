
const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql'); // load mysql package
require('dotenv').config(); // load .env file

app.use(express.json());

// DEFINISIKAN CONNECTION
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});
connection.connect();

// API HOME BASE
app.get('/', (req, res) => {
    var usage = {
        "GET all buku": "http://localhost:3000/buku",
        "GET with Limit and Page": "http://localhost:3000/buku?limit=2&page=2",
        "GET with Kode_buku": "http://localhost:3000/buku/001",
        "GET with Kategori": "http://localhost:3000/buku/kategori/Novel",
        "GET with Penulis": "http://localhost:3000/penulis/Kugane",
        "GET with Judul": "http://localhost:3000/buku/judul/Overlord",
        "GET with Tahun": "http://localhost:3000/buku/tahun/2016",
    }
    var response = {
        "message": "Welcome to Perpustakaan API",
        "List Usage GET:": usage,
        "Usage Delete:": "http://localhost:3000/buku/001",
        "Usage Update:": "http://localhost:3000/buku/001",
        "Usage Post:": "http://localhost:3000/buku",
    };
    res.status(200).send(response);
});
//Get List book 
app.get('/buku', (req, res) => {
    var sorte = req.query.sort;
    var orderquery = "";
    if (sorte != null) {
        var desce = sorte.includes("-");
        if (desce) {
            var a = sorte.substring(1)
            orderquery += " ORDER BY " + a + " DESC "
        } else {
            orderquery += " ORDER BY " + sorte + " ASC"
        }
    }
    connection.query("SELECT * FROM buku where isdeleted=0",
        function (error, results, fields) {
            if (error) {
                res.status(500).send({
                    errors: [
                        {
                            field: "-",
                            message: "database error occured",
                            err: error
                        }
                    ]
                })
            }
            else if (results.length == 0) {
                res.status(404).send({
                    errors: [
                        {
                            message: "buku is not found.",
                        }
                    ]
                })
            }
            else {
                page = 1;
                limit = 20;
                if (req.query.keyword) {
                    results = results.filter((book) => {
                        return (book.judul.toLowerCase().includes(req.query.keyword.toLowerCase()))
                    })
                }
                if (req.query.cover) {
                    results = results.filter((book) => {
                        return (book.cover.toLowerCase() == req.query.cover.toLowerCase())
                    })
                }
                if (req.query.isbn) {
                    results = results.filter((book) => {
                        return (book.isbn.toLowerCase() == req.query.isbn.toLowerCase())
                    })
                }
                if (req.query.penulis) {
                    results = results.filter((book) => {
                        return (book.penulis.toLowerCase() == req.query.penulis.toLowerCase())
                    })
                }
                if (req.query.tahun) {
                    results = results.filter((book) => {
                        return (book.tahun.toLowerCase() == req.query.tahun.toLowerCase())
                    })
                }
                if (req.query.ket) {
                    results = results.filter((book) => {
                        return (book.ket.toLowerCase() == req.query.ket.toLowerCase())
                    })
                }

                var errors = [];
                if (req.query.page) {
                    if (isNaN(req.query.page)) {
                        errors.push({
                            field: "page",
                            message: "Page should be a number",
                        });
                    }
                    else if (parseInt(req.query.page) <= 0) {
                        errors.push({
                            field: "page",
                            message: "Page should be greater than zero",
                        });
                    }
                    else {
                        page = parseInt(req.query.page);
                    }
                }
                if (req.query.limit) {
                    if (isNaN(req.query.limit)) {
                        errors.push({
                            field: "limit",
                            message: "Limit should be a number",
                        });
                    }
                    else if (parseInt(req.query.limit) <= 0) {
                        errors.push({
                            field: "limit",
                            message: "Limit should be greater than zero",
                        });
                    }
                    else {
                        limit = parseInt(req.query.limit);
                    }
                }

                var indexMin = (page - 1) * limit;
                if (indexMin < 0) {
                    indexMin = 0;
                }

                var indexMax = indexMin + limit;
                if (indexMax >= results.length) {
                    indexMax = results.length;
                }

                paginatedResult = results.filter((book, index) =>
                    index >= indexMin && index < indexMax
                );

                response = {
                    data: paginatedResult,
                    meta: {
                        page: page,
                        limit: limit,
                        totalPages: Math.ceil(results.length / limit),
                        totalData: results.length
                    }
                };

                if (errors.length > 0) {
                    res.status(400).send({
                        errors
                    });
                }
                else {
                    res.status(200).send(response)
                }
            }
            
        });
})
//Get buku by kode buku
app.get('/buku/:kd_buku', (req, res) => {
    connection.query("select * from buku "
        + " where kd_buku = ? AND isdeleted=0", [req.params.kd_buku],
        function (error, results, fields) {
            if (error) {
                res.status(500).send({
                    errors: [
                        {
                            field: "-",
                            message: "database error occured",
                        }
                    ]
                })
            }
            else if (results.length == 0) {
                res.status(404).send({
                    errors: [
                        {
                            field: "kd_buku",
                            message: "Buku with id " + req.params.kd_buku + " is not found.",
                        }
                    ]
                })
            }
            else {
                res.status(200).send(results[0]);
            }
            
        });
});
//Get buku by kategori
app.get('/buku/kategori/:kategori', (req, res) => {
    connection.query("select * from buku "
        + " where kategori_buku = ? AND isdeleted=0 ", [req.params.kategori],
        function (error, results, fields) {
            if (error) {
                res.status(500).send({
                    errors: [
                        {
                            field: "-",
                            message: "database error occured",
                        }
                    ]
                })
            }
            else if (results.length == 0) {
                res.status(404).send({
                    errors: [
                        {
                            field: "kategori_buku",
                            message: "Buku with kategori " + req.params.kategori + " is not found.",
                        }
                    ]
                })
            }
            else {
                res.status(200).send(results);
            }
            
        });
});
//Get buku by penulis
app.get('/buku/penulis/:penulis', (req, res) => {
    connection.query("select * from buku "
        + " where penulis like '%" + req.params.penulis + "%' AND isdeleted=0",
        function (error, results, fields) {
            if (error) {
                res.status(500).send({
                    errors: [
                        {
                            field: "-",
                            message: "database error occured",
                        }
                    ]
                })
            }
            else if (results.length == 0) {
                res.status(404).send({
                    errors: [
                        {
                            field: "penulis",
                            message: "Buku with penulis " + req.params.penulis + " is not found.",
                        }
                    ]
                })
            }
            else {
                res.status(200).send(results);
            }
            
        });
});
//Get buku by judul
app.get('/buku/judul/:judul', (req, res) => {
    connection.query("select * from buku "
        + " where judul like '%" + req.params.judul + "%' AND isdeleted=0",
        function (error, results, fields) {
            if (error) {
                res.status(500).send({
                    errors: [
                        {
                            field: "-",
                            message: "database error occured",
                        }
                    ]
                })
            }
            else if (results.length == 0) {
                res.status(404).send({
                    errors: [
                        {
                            field: "judul",
                            message: "Buku with judul " + req.params.judul + " is not found.",
                        }
                    ]
                })
            }
            else {
                res.status(200).send(results);
            }
            
        });
});
//Get buku by tahun
app.get('/buku/tahun/:tahun', (req, res) => {
    connection.query("select * from buku "
        + " where tahun  = ? AND isdeleted=0", [req.params.tahun],
        function (error, results, fields) {
            if (error) {
                res.status(500).send({
                    errors: [
                        {
                            field: "-",
                            message: "database error occured",
                        }
                    ]
                })
            }
            else if (results.length == 0) {
                res.status(404).send({
                    errors: [
                        {
                            field: "tahun",
                            message: "Buku with tahun " + req.params.tahun + " is not found.",
                        }
                    ]
                })
            }
            else {
                res.status(200).send(results);
            }
            
        });
});
// Checking Error
function checkingError(newbuku) {
    var errors = []
    // jika newbuku.judul kosong
    if (!newbuku.judul) {
        errors.push({
            field: "judul",
            message: "judul buku is required"
        })
    }
    // jika newbuku.isbn kosong
    if (!newbuku.isbn) {
        errors.push({
            field: "isbn",
            message: "isbn buku is required"
        })
    }
    // jika newbuku.cover kosong
    if (!newbuku.cover) {
        errors.push({
            field: "cover",
            message: "cover buku is required"
        })
    }
    // jika newbuku.penulis kosong
    if (!newbuku.penulis) {
        errors.push({
            field: "penulis",
            message: "penulis buku is required"
        })
    }
    // jika newbuku.tahun kosong
    if (!newbuku.tahun) {
        errors.push({
            field: "tahun",
            message: "tahun buku is required"
        })
    }
    //jika tahun tidak angka
    else if (isNaN(newbuku.tahun)) {
        errors.push({
            field: "tahun",
            message: "tahun buku should be a number"
        })
    }
    // jika newbuku.kategori kosong
    if (!newbuku.kategori_buku) {
        errors.push({
            field: "kategori",
            message: "kategori buku is required"
        })
    }
    // jika newbuku.keterangan kosong
    if (!newbuku.ket) {
        errors.push({
            field: "ket",
            message: "ket buku is required"
        })
    }
    return errors;
}
// Cek ID user, dan Id Buku
function checkingUserIdAndBookId(req) {
    var errors = []
    // jika data.id
    if (!req.user_id) {
        errors.push({
            field: "user_id",
            message: "id user is required"
        })
    }
    // Cek id buku
    if (!req.book_id) {
        errors.push({
            field: "book_id",
            message: "id buku is required"
        })
    }

    return errors;
}
//Post/ Tambahkan buku 
app.post('/buku', (req, res) => {
    var newbuku = req.body;
    var errors = checkingError(newbuku);

    if (errors.length > 0) {
        res.status(400).send({
            errors
        });
    }
    else {
        connection.query('INSERT INTO buku (`judul`, `isbn`, `cover`, `penulis`, `tahun`, `kategori_buku`, `ket`, `isdeleted`)' +
            ' VALUES (?,?,?,?,?,?,?,false)',
            [
                newbuku.judul,
                newbuku.isbn,
                newbuku.cover,
                newbuku.penulis,
                newbuku.tahun,
                newbuku.kategori_buku,
                newbuku.ket,
            ],
            function (error, rows, fields) {
                if (error) {
                    errors.push({
                        "field": "Error on adding a new buku",
                        "message": error
                    });
                    res.status(400).send({
                        errors
                    });
                } else {
                    var response = {
                        "data": newbuku,
                        "message": "New buku succesfully added to the list.",
                    };
                    res.status(201).send(response);
                }
            })
    }

});
//Update/ Edit buku
app.put('/buku/:kd_buku', (req, res) => {
    var updatebuku = req.body;
    var dataForUpdate = {
        "judul": updatebuku.judul,
        "isbn": updatebuku.isbn,
        "cover": updatebuku.cover,
        "penulis": updatebuku.penulis,
        "tahun": updatebuku.tahun,
        "kategori_buku": updatebuku.kategori_buku,
        "ket": updatebuku.ket,
    }
    var errors = checkingError(dataForUpdate)
    // jika updatebuku.kd_buku kosong / null / empty
    if (errors.length > 0) {
        res.status(400).send({
            errors
        });
    }
    else {
        connection.query('UPDATE buku SET' +
            ' judul =?, isbn= ? , cover=?, penulis=?, tahun=?, kategori_buku=?, ket=?  WHERE kd_buku = ?',
            [
                dataForUpdate.judul,
                dataForUpdate.isbn,
                dataForUpdate.cover,
                dataForUpdate.penulis,
                dataForUpdate.tahun,
                dataForUpdate.kategori_buku,
                dataForUpdate.ket
            ],
            function (error, rows, fields) {
                if (error) {
                    errors.push({
                        "field": "Update Data",
                        "message": error
                    });
                    res.status(400).send({
                        errors
                    });
                } else {
                    if (rows.affectedRows < 1) {
                        errors.push({
                            "field": "Select",
                            "message": "buku with kd_buku " + req.params.kd_buku + " is not found."
                        });
                        res.status(400).send({
                            errors
                        });
                    } else {
                        var response = {
                            "data": dataForUpdate,
                            "message": "Update buku success.",
                        };
                        res.status(200).send(response);
                    }
                }
            })
    }

});
//Delete buku berdasarkan kode_buku
app.delete('/buku/:kd_buku', (req, res) => {
    var dataId = req.params.kd_buku;
    var errors = [];
    connection.query('UPDATE buku set isdeleted = 1 where kd_buku = ?', [dataId],
        function (error, rows, fields) {
            if (error) {
                errors.push({
                    "field": "Select",
                    "message": "Query for select is error"
                });
            }
            if (errors.length > 0) {
                res.status(404).send({
                    errors
                });
            }
            else {
                var response = {
                    "data": "kd_buku",
                    "message": "Delete a buku success.",
                };
                res.status(200).send(response);
            }
        });

});

// Status Buku
// 0 =  belum dipinjam / tersedia
// 1 =  dipinjam oleh orang
//Post/ Peminjaman Buku 
app.post('/peminjaman/pinjam', (req, res) => {
    var data_peminjaman = req.body;
    var errors = checkingUserIdAndBookId(data_peminjaman);
    console.log("user", data_peminjaman.user_id)
    console.log("book", data_peminjaman.book_id)

    if (errors.length > 0) {
        res.status(400).send({
            errors
        });
    }
    else {
        connection.query(
            'UPDATE buku SET status_buku = 1, id_peminjam = ? WHERE kd_buku = ? ;' +
            'UPDATE get_detail_account SET status_peminjaman = 1,id_buku_pinjaman = ? WHERE id_account = ?',
            [
                data_peminjaman.user_id,
                data_peminjaman.book_id,
                data_peminjaman.book_id,
                data_peminjaman.user_id,
            ],
            function (error, rows, fields) {
                console.log(error)
                if (error) {
                    errors.push({
                        "field": "Error on update a peminjaman buku",
                        "message": error
                    });
                    res.status(400).send({
                        errors
                    });
                } else {
                    var response = {
                        "data": data_peminjaman,
                        "message": "Buku sukses dipinjam",
                    };
                    res.status(200).send(response);
                }
            })
    }

});
// Post Kembalikan Buku
app.post('/peminjaman/kembali', (req, res) => {
    var data_peminjaman = req.body;
    var errors = checkingUserIdAndBookId(data_peminjaman);
    console.log("user", data_peminjaman.user_id)
    console.log("book", data_peminjaman.book_id)

    if (errors.length > 0) {
        res.status(400).send({
            errors
        });
    }
    else {
        connection.query(
            'UPDATE buku SET status_buku = 0, id_peminjam = ? WHERE kd_buku = ? ;' +
            'UPDATE get_detail_account SET status_peminjaman = 0,id_buku_pinjaman = ? WHERE id_account = ?',
            [
                data_peminjaman.user_id,
                data_peminjaman.book_id,
                data_peminjaman.book_id,
                data_peminjaman.user_id,
            ],
            function (error, rows, fields) {
                console.log(error)
                if (error) {
                    errors.push({
                        "field": "Error on update a kembalikan buku",
                        "message": error
                    });
                    res.status(400).send({
                        errors
                    });
                } else {
                    var response = {
                        "data": data_peminjaman,
                        "message": "Buku sukses dikembalikan",
                    };
                    res.status(200).send(response);
                }
            })
    }
});
// Status peminjaman oleh user
// 0 = tidak melakukan peminjaman
// 1 = melakukan peminjaman buku
// user harus balikin buku baru boleh pinjem lg..

//API GENRE/Kategori
app.get('/kategori_buku', (req, res) => {
    // var dbConnect = mysql.createConnection({
    //     host: process.env.DB_HOST,
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME,
    //     multipleStatements: true
    // });
    // dbConnect.connect();
    connection.query(" SELECT * FROM `kategori_buku` WHERE is_deleted = 0", function (error, results, fields) {
        if (error) {
            res.status(500).send({
                "message": "database error occured",
                "detail": error
            })
        }
        else if (results.length == 0) {
            res.status(404).send({
                errors: [
                    {
                        field: "id",
                        message: "Kategori list is not found.",
                    }
                ]
            })
        }
        else {
            res.status(200).send(results)
        }
        // dbConnect.end();
    })
});
//Get Kategori By Id
app.get('/kategori_buku/:kd_kategoribuku', (req, res) => {
    connection.query(" SELECT * FROM `kategori_buku` WHERE kd_kategoribuku = ? AND is_deleted = 0",
        [req.params.kd_kategoribuku],
        function (error, results, fields) {
            if (error) {
                res.status(500).send({
                    "message": "database error occured",
                    "detail": error
                })
            }
            else if (results.length == 0) {
                res.status(404).send({
                    errors: [
                        {
                            field: "id",
                            message: "Kategori with id " + req.params.kd_kategoribuku + " is not found.",
                        }
                    ]
                })
            }
            else {
                res.status(200).send(results[0])
            }
        })
});

// Create Kategori
app.post('/kategori_buku', (req, res) => {
    var newgenre = req.body;
    var errors = [];
    if (!newgenre.nm_kategoribuku) {
        errors.push({
            field: "Nama Kategori",
            message: "Nama kategori buku is required"
        })
    }
    if (errors.length > 0) {
        res.status(400).send({
            errors
        });
    }
    else {
        connection.query("INSERT INTO kategori_buku (nm_kategoribuku) values (?)",
            [newgenre.nm_kategoribuku],
            function (error, rows, fields) {
                if (error) {
                    errors.push({
                        "field": "Error on adding a new genre",
                        "message": error
                    });
                    res.status(400).send({
                        errors
                    });
                } else {
                    var response = {
                        "data": newgenre,
                        "message": "New genre succesfully added to the list.",
                    };
                    res.status(200).send(response);
                }
            })
    }

});
//Update/ Edit genre
app.put('/kategori_buku/:kd_kategoribuku', (req, res) => {
    var updategenre = req.body;
    var errors = [];
    if (!updategenre.nm_kategoribuku) {
        errors.push({
            field: "Nama Kategori",
            message: "Nama kategori buku is required"
        })
    }
    if (!updategenre.kd_kategoribuku) {
        errors.push({
            field: "Kode Kategori",
            message: "Kode kategori buku is required"
        })
    }
    if (errors.length > 0) {
        res.status(400).send({
            errors
        });
    }
    else {
        connection.query('UPDATE buku SET nm_kategoribuku = ?  WHERE kd_kategoribuku = ?',
            [
                updategenre.nm_kategoribuku,
                updategenre.kd_kategoribuku
            ],
            function (error, rows, fields) {
                if (error) {
                    errors.push({
                        "field": "Update Data",
                        "message": error
                    });
                    res.status(400).send({
                        errors
                    });
                } else {
                    if (rows.affectedRows < 1) {
                        errors.push({
                            "field": "Select",
                            "message": "Genre with kd_kategoribuku " + req.params.kd_kategoribuku + " is not found."
                        });
                        res.status(400).send({
                            errors
                        });
                    } else {
                        var response = {
                            "data": updategenre,
                            "message": "Update genre success.",
                        };
                        res.status(200).send(response);
                    }
                }
            })
    }

});
//Delete genre berdasarkan kd_kategoribuku
app.delete('/kategori_buku/:kd_kategoribuku', (req, res) => {
    var dataId = req.params.kd_kategoribuku;
    var errors = [];
    if (!dataId) {
        errors.push({
            field: "Kode Kategori",
            message: "Kode kategori buku is required"
        })
    }
    connection.query('UPDATE kategori_buku set is_deleted = 1 where kd_kategoribuku = ?', [dataId],
        function (error, rows, fields) {
            if (error) {
                errors.push({
                    "field": "Select",
                    "message": "Query for select is error"
                });
            }
            if (errors.length > 0) {
                res.status(404).send({
                    errors
                });
            }
            else {
                var response = {
                    "data": "kd_kategoribuku",
                    "message": "Delete the genre success.",
                };
                res.status(200).send(response);
            }
        });

});

// Listen
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
)
