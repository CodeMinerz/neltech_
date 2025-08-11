<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Importing Data From Old Database need to migrate the users from old database to new database structure 
     * some columns required to be null for migration of all users from old database to new database
     * 
     * 
     * Problem : 
     * 
     * Old Password is not Encrypted 
     * Some users forgot their password.
     * need to import users data including the password
     * 
     * 
     * Solution: 
     * create columns for old password 
     * import the password from old database
     * detect if the user is first time to login
     * make Temp register URL to make new password
     * update the password and deactivate the old password 
     * old password can use as recovery password as temporary but they need to contact the MIS / (Database responsible/access) to activate it once again.
     * 
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->rememberToken();
            $table->string('emp_no',25)->nullable();

            //fillable
            $table->string('username', 25);
            $table->string('password', 100)->nullable(); 
            $table->string('fullname', 30)->nullable();
            $table->string('f_name', 30)->nullable();
            $table->string('l_name', 30)->nullable();
            $table->string('phone_no', 30)->nullable();
            $table->string('b_date', 15)->nullable();
            // users logs
            $table->string('allowance', 10)->nullable()->default('-3');
            $table->datetime('le',)->nullable()->comment('Last Export');
            $table->datetime('lo')->nullable()->comment('Last Opened');
            $table->datetime('lc')->nullable()->comment('Last Closed');
            $table->boolean('opened')->nullable();
            $table->string('mac_add', 50)->nullable();
            $table->boolean('first_time')->default(1);
            $table->string('old_pass', 100)->nullable(); #  old Password it's not Encrypted. It only need when the user is first time to login.  
            $table->json('my_info')->nullable();
            $table->boolean('active')->nullable()->default(1);
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('comp_name', 20)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
