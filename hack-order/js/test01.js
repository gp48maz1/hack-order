$(document).ready(function(){
	$('#minblabla').click(function(){
		//grab the current_xp from the database
		//grab the total_xp for the level from the database

		//make xpEval func
		//check to see if the current_xp + the added_xp > total_xp
		//if c_xp + a_xp < t_xp set c_xp = c_xp + a_xp
		//else set c_xp = c_xp - a_xp - t_xp AND raise user level by one


		var xp=0;
		if ( $(this).attr('value') > xp)
		{
			xp = $(this).attr('value');
		}	
		$('.progress-bar').css('width',xp+'%').attr('aria-valuenow', xp);
		$('.progress-bar').text(xp+'%');
	});

	//just values pretending to be the database
	var db = null;
	var goLangLvl = 6;
	var goLangCurrentXP = 35;
	var goLangMaxXP = 100;

	if(window.openDatabase){
		db = openDatabase("XPbar","1.0","XP Bar Database",10000000);
		if(!db){
			alert("Failed to open database");
		}
	} else {
		alert("Failed to open database make sure browser supports html5");
	}

	function XPbar(){
		var self = this;

		var XPbar = document.createElement('div');
		XPbar.className = 'XPbar';
		/*this.XPbar = XPbar*/

		var add30min = document.createElement('div');
		add30min.className = 'add30min';
		add30min.addEventListener('click', function(){
			return self.onAdd30minClick();
		}, false);
		XPbar.appendChild(add30min);

		var XPbarImg = document.createElement('div');
		XPbarImg.className = 'XPbarImg';

		/*need to set the lvl, current, and max?*/

		document.body.appendChild(XPbar);
		return this;


	}

	XPbar.prototype = {
		get id(){
			if(!("_id" in this))
				this._id = 0;
			return this._id;
		},

		set id(x){
			this._id = x;
		},

		get lvl(){
			return this.lvl;
		},

		set lvl(x){
			this.lvl = x;
		},

		get currentXP(){
			return this.currentXP;
		},

		set currentXP(x){
			/* maybe where i would set eq so it stays right percent */
			this.currentXP = x;
		},

		get maxXP(){
			return maxXP;
		},

		set maxXP(x){
			this.maxXP = x;
		},

		onAdd30minClick: function(){
			addXP(30);
		},

		onAdd45minXP: function(){
			addXP(45);
		},

		onAdd1hrXP: function(){
			addXP(60);
		},

		add1ProjXP: function(){
			addXP(200);
		},

		addXP: function(xp){
			//grab the current_xp from the database
			//grab the total_xp for the level from the database
			//var lvl = this.lvl;
			//var currentXP = this.currentXP;
			//var maxXP = this.maxXP;

			//make xpEval func
			//check to see if the current_xp + the added_xp < total_xp
			if(this.currentXP + xp < this.maxXP){
				//if c_xp + a_xp < t_xp set c_xp = c_xp + a_xp
				this.currentXP = this.currentXP + xp;
			} else {
				//else set c_xp = c_xp + a_xp - t_xp AND raise user level by one (AND assign NEW MAX XP or have this as an all in one)
				this.currentXP = this.currentXP + xp - this.maxXP;
				this.lvl++;
			}
		}

	}

	// function add30minXP(){


	// }

	// function add45minXP(){

	// }

	// function add1hrXP(){

	// }

	// function add1ProjXP(){

	// }

	/*working on*//*
	$('div#container').on('click', 'div.minblabla',function(){
		var xp = 0;
		alert('Woo');
		$('.minblabla').click(function(){
			alert("hello");
			if ( $(this).attr('value') > xp)
			{
				xp = $(this).attr('value');
			}
		});
		$('.progress-bar').css('width',xp+'%').attr('aria-valuenow', xp);
	});
	*/

	//this calls the loadXPbars, NEED TO CHG PARAMETERS
	function loaded(){
		db.transaction(function(tx){
			tx.executeSql("SELECT COUNT(*) FROM XPbar", [], function(result){
				loadXPbars();
			}, function(tx, error){
				tx.executeSql("CREATE TABLE XPbar (id REAL UNIQUE, note TEXT, timestamp REAL, left TEXT, top TEXT, zindex REAL)",
				[], function(result){
					loadXPbars();
				});
			});
		});
	}

	//this needs to be changed to match 1 type of experience bar 
	function loadXPbars(){
		db.transaction(function(tx){
			tx.executeSql("SELECT id, note, timestamp, left, top, zindex, FROM MyStickys", [], function(tx, result){
				for(var i = 0; i < result.rows.length; ++i){
					var row = result.rows.item(i);
					var note = new Note();
					note.id = row['id'];
					note.text = row['note'];
					note.timestamp = row['timestamp'];
					note.left = row['left'];
					note.top = row['top'];
					note.zIndex = row['xIndex'];

					if(row['id'] > highestId){
						highestId = row['Id'];
					}

					if(row['zIndex'] > highestZ){
						highestZ = row['zIndex'];
					}
				}

				if(!result.rows.length)
					newNote();
			}, function(tx, error){
				alert("Failed to get notes - "+error.message);
				return;
			});
		});
	}

	if(db != null){
		document.addEventListener("load", loaded, false);
	}

});