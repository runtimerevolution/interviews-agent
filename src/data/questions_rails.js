export const questions = [
  {
    "id": 1,
    "category": "Object-Oriented Programming (OOP)",
    "level": "junior",
    "title": "Instance vs Local Variable Scope",
    "question": "Look at the code example below. Explain what `@name` is and what `name` (without the @ symbol) is inside the `introduce` method. What will this code print out and why?",
    "correctAnswer": "`@name` is an instance variable, meaning it is accessible throughout the entire instance of the class. `name` (inside the `introduce` method) is a local variable, only available within that specific method scope. The code will print 'Hello, Alice. My name is Stranger.' because the second string interpolation uses the local variable `name` ('Stranger'), not the instance variable.",
    "codeExample": "class Person\n  def initialize(name_passed_in)\n    @name = name_passed_in # Instance variable\n  end\n\n  def introduce\n    name = \"Stranger\" # Local variable\n    puts \"Hello, #{@name}. My name is #{name}.\"\n  end\nend\n\np = Person.new(\"Alice\")\np.introduce\n# Output: Hello, Alice. My name is Stranger.",
    "scoringCriteria": {
      "0": "No response or cannot identify either variable type",
      "25": "Recognizes @ symbol but cannot explain the difference clearly",
      "50": "Can explain instance vs local variables but predicts wrong output",
      "75": "Correctly explains both variable types and predicts the output",
      "100": "Full explanation of scope, variable lifetime, and correct output with reasoning"
    }
  },
  {
    "id": 3,
    "category": "Practical Coding / Hashes",
    "level": "junior",
    "title": "Summing Hash Values",
    "question": "Given a hash representing a cart where keys are item names (symbols) and values are prices (integers), write code to calculate the total cost. Bonus points if you can do it in one line using built-in methods.",
    "correctAnswer": "A basic answer will iterate over the hash using `.each` and add values to an accumulator variable. A strong junior answer will know how to access just the values of the hash and use an enumerable method like `.sum` (Ruby 2.4+) or `.reduce(:+)` to calculate the total in a functional style.",
    "codeExample": "cart = { apple: 1, banana: 2, steak: 15, pasta: 5 }\n\n# Approach 1: Iteration\ntotal = 0\ncart.each { |item, price| total += price }\n\n# Approach 2 (Idiomatic/Bonus): Using .sum\ntotal_sum = cart.values.sum\n\n# Approach 3 (Functional): Using reduce/inject\ntotal_reduce = cart.values.reduce(:+)",
    "scoringCriteria": {
      "0": "No response or cannot work with hashes",
      "25": "Can explain the concept but cannot write working code",
      "50": "Uses a basic loop (for/while) with manual accumulator",
      "75": "Uses .each with accumulator or accesses .values correctly",
      "100": "Uses .values.sum or .values.reduce(:+) - idiomatic one-liner"
    }
  },
  {
    "id": 4,
    "category": "Rails Fundamentals",
    "level": "junior",
    "title": "Convention over Configuration",
    "question": "One of Rails' main philosophies is 'Convention over Configuration'. Can you give a simple example of what this means in practice?",
    "correctAnswer": "It means Rails makes assumptions about what you want to do based on naming conventions, saving you from writing config files. For example, if you create a model named `Post` (singular), Rails automatically assumes the corresponding database table is named `posts` (plural), and the controller is `PostsController`.",
    "codeExample": "# Because I named this class 'Article'...\nclass Article < ApplicationRecord\nend\n\n# ...Rails automatically knows to look into a DB table named 'articles'.\n# I don't have to configure it like: set_table_name = 'my_articles_table'",
    "scoringCriteria": {
      "0": "No response or unfamiliar with the concept",
      "25": "Heard of the term but cannot provide any example",
      "50": "Vague understanding, mentions 'less configuration' without specifics",
      "75": "Gives one clear example (model/table naming or controller naming)",
      "100": "Explains the philosophy and provides multiple examples (model→table, controller naming, routes)"
    }
  },
  {
    "id": 5,
    "category": "Active Record / Validations",
    "level": "junior",
    "title": "Active Record Validations",
    "question": "Where do validations (like ensuring an email field isn't empty) typically live in a Rails app, and at what point in the object lifecycle do they run?",
    "correctAnswer": "Validations live in the Model file. They run when you try to persist data to the database, typically when calling methods like `.save`, `.create`, or `.update`. If validations fail, these methods return `false` and the data is not saved to the database.",
    "codeExample": "# app/models/user.rb\nclass User < ApplicationRecord\n  # These run before .save attempts the DB insert\n  validates :username, presence: true\n  validates :email, presence: true, uniqueness: true\nend\n\nuser = User.new(username: \"test\")\nuser.save # => false (because email is missing)\nuser.errors.full_messages # => [\"Email can't be blank\"]",
    "scoringCriteria": {
      "0": "No response or doesn't know where validations go",
      "25": "Mentions models but unclear on when validations run",
      "50": "Knows validations are in models, vague on lifecycle timing",
      "75": "Correctly states models and mentions save/create triggers validations",
      "100": "Full explanation: models, triggers on save/create/update, returns false on failure, .errors access"
    }
  },
  {
    "id": 23,
    "category": "Security / Junior",
    "level": "junior",
    "title": "SQL Injection Basics",
    "question": "What is SQL Injection, and how does Rails' Active Record help prevent it when you use methods like `where` with question mark placeholders?",
    "correctAnswer": "SQL Injection is a code injection technique where malicious SQL commands are inserted into an input field to tamper with or gain unauthorized access to a database. Rails' Active Record helps prevent this by using parameterized queries when you use question mark placeholders (`?`) in methods like `where`. Instead of directly concatenating user input into the SQL string, Rails passes the input as a separate parameter to the database driver, which ensures the input is treated as data, not executable code.",
    "codeExample": "# Vulnerable (DO NOT DO THIS!):\n# User input directly concatenated\n# name = params[:user_name]\n# User.where(\"name = '#{name}'\") \n# If name = \"' OR 1=1 --\", the query becomes: SELECT * FROM users WHERE name = '' OR 1=1 --'\n\n# Secure (Rails sanitizes input):\n# User input passed as a parameter\nname = params[:user_name]\nUser.where(\"name = ?\", name) \n# Becomes: SELECT * FROM users WHERE name = $1 -- parameter ' OR 1=1 --' is treated as a string value",
    "scoringCriteria": {
      "0": "No response or unfamiliar with SQL injection",
      "25": "Heard of SQL injection but cannot explain how it works",
      "50": "Can explain SQL injection concept but not Rails' protection",
      "75": "Explains both the attack and mentions parameterized queries or placeholders",
      "100": "Full explanation with example of vulnerable vs secure code, mentions sanitization"
    }
  },
  {
    "id": 24,
    "category": "Security / Junior",
    "level": "junior",
    "title": "Cross-Site Request Forgery (CSRF)",
    "question": "What is Cross-Site Request Forgery (CSRF)? How does Rails protect against it by default?",
    "correctAnswer": "CSRF is an attack where an attacker tricks a user's browser into making an unwanted request to a web application in which they're currently authenticated. For example, tricking an logged-in user to click a link that sends a POST request to transfer money from their bank.\n\nRails protects against CSRF by default using an **authenticity token** (or CSRF token). This token is a random string embedded in forms and AJAX requests. When a request comes in, Rails verifies that the token submitted with the request matches the token stored in the user's session. If they don't match, Rails rejects the request, preventing an attacker from forging requests from external sites.",
    "codeExample": "# In a Rails view, Rails automatically adds this hidden field to forms:\n# <form action=\"/posts\" method=\"post\">\n#   <input type=\"hidden\" name=\"authenticity_token\" value=\"<random_string_here>\">\n#   ...\n# </form>\n\n# In app/controllers/application_controller.rb (default for Rails apps):\nclass ApplicationController < ActionController::Base\n  protect_from_forgery with: :exception # This line enables CSRF protection\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with CSRF",
      "25": "Heard of CSRF but cannot explain the attack vector",
      "50": "Can explain CSRF attack but not Rails' protection mechanism",
      "75": "Explains the attack and mentions authenticity token",
      "100": "Full explanation: attack scenario, token mechanism, protect_from_forgery, session matching"
    }
  },
  {
    "id": 29,
    "category": "Ruby Fundamentals",
    "level": "junior",
    "title": "Symbols vs. Strings",
    "question": "What are symbols in Ruby, and how are they different from strings?",
    "correctAnswer": "A **Symbol** is an object representing a unique name or identifier, denoted by a colon prefix (e.g., `:name`). They are **immutable** and are only allocated once in memory, regardless of how many times they are used. **Strings** (e.g., `'name'`) are a sequence of characters, are **mutable**, and a new object is created in memory every time a string literal is encountered. Symbols are generally preferred over strings for keys in hashes, object attributes, and internal names because they are more efficient for comparison and memory usage. Comparing two symbols is simply checking if they point to the same object ID, whereas comparing two strings involves checking the content character-by-character.",
    "codeExample": "puts \"Symbol ID: #{:name.object_id}\"\nputs \"Symbol ID: #{:name.object_id}\" # Same ID, only one object created\n\nputs \"---\"\n\nputs \"String ID: #{\"name\".object_id}\"\nputs \"String ID: #{\"name\".object_id}\" # Different IDs, two objects created\n\nhash = { role: 'admin', :status => 'active' } \nputs hash[:role]",
    "scoringCriteria": {
      "0": "No response or cannot identify what a symbol is",
      "25": "Knows symbols use : prefix but unclear on differences",
      "50": "Mentions immutability OR memory efficiency, not both",
      "75": "Explains immutability, memory allocation, and hash key usage",
      "100": "Full explanation: immutability, single allocation, object_id comparison, use cases"
    }
  },
  {
    "id": 31,
    "category": "Ruby Fundamentals",
    "level": "junior",
    "title": "Truthiness in Ruby",
    "question": "Can you explain what nil, false, and true represent in Ruby?",
    "correctAnswer": "In Ruby, every expression evaluates to either a **truthy** or **falsy** value. This is crucial for control flow structures (like `if` statements). \n\n* **`true`:** An instance of the class `TrueClass`. It explicitly represents the boolean value of true. It is **truthy**.\n* **`false`:** An instance of the class `FalseClass`. It explicitly represents the boolean value of false. It is **falsy**.\n* **`nil`:** An instance of the class `NilClass`. It represents the absence of a value, often used to indicate that a variable has not been initialized or a method returned nothing meaningful. It is **falsy**.\n\n**Crucially**, in Ruby, only **`false`** and **`nil`** are **falsy**. **Every other object**, including `0`, empty strings `''`, and empty arrays `[]`, is considered **truthy** in conditional logic.",
    "codeExample": "# Falsy values\nif false\n  puts \"False is truthy\"\nelsif nil\n  puts \"Nil is truthy\"\nelse\n  puts \"False and nil are falsy\"\nend\n\n# Truthy values\nif 0\n  puts \"0 is truthy (unlike many other languages)\"\nend\n\nif \"\"\n  puts \"Empty string is truthy\"\nend",
    "scoringCriteria": {
      "0": "No response or confuses Ruby with other languages",
      "25": "Knows true/false exist but confused about nil or truthiness",
      "50": "Can explain nil as 'nothing' but misses Ruby's unique truthiness rules",
      "75": "Correctly identifies only false and nil as falsy",
      "100": "Full explanation: TrueClass/FalseClass/NilClass, only false/nil are falsy, 0 and '' are truthy"
    }
  },
  {
    "id": 7,
    "category": "OOP Concepts",
    "level": "mid",
    "title": "Inheritance vs. Mixins",
    "question": "In Ruby, how do **inheritance** (using `<` operator) and **mixins** (using `include`) differ in terms of code reuse and class hierarchy? Provide a scenario where one is clearly preferred over the other.",
    "correctAnswer": "Inheritance establishes an **'is-a'** relationship, where a subclass inherits all methods and attributes from a single superclass, creating a deep, rigid hierarchy (e.g., A `Dog` *is-a* `Animal`). Ruby enforces **single inheritance**, meaning a class can only inherit from one parent.\n\nMixins (via `include`) establish a **'has-a'** or **'can-do'** relationship. They inject instance methods from a module into a class, allowing classes to share behavior without sharing a parent class. This resolves the multiple inheritance problem. Mixins are preferable when sharing a specific capability (e.g., a `Dog` and a `Car` can both be `Printable`). Inheritance is preferred when modeling a strong hierarchical relationship.",
    "codeExample": "# Inheritance (Is-A)\nclass Animal; def speak; end; end\nclass Dog < Animal; end\n\n# Mixin (Can-Do)\nmodule Flyable; def fly; end; end\nclass Bird; include Flyable; end\n\n# Dog.new.respond_to?(:fly) # => false\n# Bird.new.respond_to?(:fly) # => true",
    "scoringCriteria": {
      "0": "No response or confuses inheritance with mixins",
      "25": "Knows both exist but cannot explain differences",
      "50": "Explains one concept well but not the other",
      "75": "Explains is-a vs can-do, mentions single inheritance limitation",
      "100": "Full explanation with scenarios, mentions include/extend, ancestor chain impact"
    }
  },
  {
    "id": 10,
    "category": "OOP Concepts",
    "level": "mid",
    "title": "Access Modifiers: Public, Private, Protected",
    "question": "Differentiate between **public**, **private**, and **protected** access modifiers in Ruby methods, specifically explaining how **private** and **protected** differ in terms of accessibility by inherited classes and sibling instances.",
    "correctAnswer": "In Ruby, access modifiers control where a method can be called from:\n\n1.  **Public (Default):** Methods can be called by **any object** (including the object itself, inherited classes, and external objects).\n2.  **Private:** Methods can **only be called without an explicit receiver** (i.e., only by `self`). They cannot be called with a receiver like `obj.private_method`. This means they can be called from inherited classes, but only implicitly.\n3.  **Protected:** Methods can be called by the object itself (`self`) **or** by any other instance of the object's defining class or its descendant classes. Protected methods can be called with an explicit receiver, provided the receiver is a sibling or ancestor instance (e.g., `other_instance.protected_method`). Protected is primarily used for comparison or collaboration between sibling instances.",
    "codeExample": "class Person\n  def public_method; private_method; end\n  \n  protected\n  def protected_method(other)\n    # Can be called with an explicit receiver, provided it's a Person or subclass\n    self.salary == other.salary \n  end\n\n  private\n  def private_method\n    # Only callable implicitly (without self) within the class scope\n    puts \"Private call\"\n  end\nend\n\np1 = Person.new\n# p1.private_method # => NoMethodError (illegal receiver)\np1.public_method # => Private call\n",
    "scoringCriteria": {
      "0": "No response or unfamiliar with access modifiers",
      "25": "Knows public/private exist but cannot differentiate properly",
      "50": "Can explain public and private but misses protected nuances",
      "75": "Explains all three with receiver rules for private",
      "100": "Full explanation: receiver rules, sibling instance access for protected, inheritance behavior"
    }
  },
  {
    "id": 25,
    "category": "Security / Mid",
    "level": "mid",
    "title": "Strong Parameters",
    "question": "What problem does 'Strong Parameters' solve in Rails, and how does it prevent mass assignment vulnerabilities? Provide an example.",
    "correctAnswer": "Strong Parameters solves the **mass assignment vulnerability**. This vulnerability occurs when an attacker can submit arbitrary input fields (e.g., `is_admin: true`) via a form, and if the application directly assigns all `params` to a model, the attacker could change attributes they shouldn't have access to.\n\nStrong Parameters forces you to explicitly **whitelist** which attributes are allowed to be assigned to a model from `params`. By defining a permitted list, any unpermitted attributes are silently discarded, preventing malicious assignments.",
    "codeExample": "# In a controller:\nclass UsersController < ApplicationController\n  def create\n    # DANGEROUS: User.new(params[:user]) might allow assigning 'is_admin' or 'admin_level'\n    # if an attacker adds those to the form/request payload.\n\n    # SECURE: Using Strong Parameters\n    @user = User.new(user_params)\n    if @user.save\n      redirect_to @user\n    else\n      render :new\n    end\n  end\n\n  private\n\n  def user_params\n    # ONLY :name, :email, and :password are allowed for mass assignment\n    params.require(:user).permit(:name, :email, :password)\n  end\nend\n\n# If params[:user] contains { name: \"Alice\", email: \"a@b.com\", password: \"123\", is_admin: true }\n# Only name, email, and password will be assigned to the new User object. is_admin will be ignored.",
    "scoringCriteria": {
      "0": "No response or unfamiliar with strong parameters",
      "25": "Heard of it but cannot explain the vulnerability it prevents",
      "50": "Understands mass assignment risk but vague on implementation",
      "75": "Explains vulnerability and shows require/permit syntax",
      "100": "Full explanation with attack scenario, whitelist approach, private method pattern"
    }
  },
  {
    "id": 26,
    "category": "Security / Mid",
    "level": "mid",
    "title": "Cross-Site Scripting (XSS)",
    "question": "What is Cross-Site Scripting (XSS)? How does Rails, particularly in its view layer (ERB), help to mitigate XSS vulnerabilities by default? What is a scenario where you might still be vulnerable?",
    "correctAnswer": "Cross-Site Scripting (XSS) is a type of security vulnerability that enables attackers to inject client-side scripts (e.g., JavaScript) into web pages viewed by other users. These scripts can then bypass access controls and perform actions like stealing session cookies, defacing websites, or redirecting users.\n\nRails mitigates XSS by default through **auto-escaping** in its ERB templates. Any output from `<%= ... %>` is automatically HTML-escaped, converting characters like `<`, `>`, `&`, and `\"` into their HTML entities (`&lt;`, `&gt;`, `&amp;`, `&quot;`). This prevents injected script tags from being interpreted as code by the browser.\n\n**Scenario where you might still be vulnerable:**\n-   **Using `html_safe` or `raw`:** If you explicitly use `html_safe` or `raw` on user-provided input without properly sanitizing it first. This tells Rails 'I know this content is safe, don't escape it,' which can be dangerous.\n-   **Custom JavaScript injection:** If dynamic JavaScript is constructed using unsanitized user input.\n-   **External Libraries/Gems:** If a third-party library or gem introduces its own rendering that doesn't properly escape output.\n-   **Stored XSS in attributes:** If user input is directly inserted into HTML attributes without proper attribute-specific escaping (though Rails does a good job with most helpers).",
    "codeExample": "# In a Rails view (e.g., app/views/posts/show.html.erb)\n\n# User-provided content:\n# @post.title = \"My <script>alert('XSS!');</script> Post\"\n\n# Default Rails behavior (SECURE):\n# <%= @post.title %> \n# Output: My &lt;script&gt;alert(&#39;XSS!&#39;);&lt;/script&gt; Post\n# The script is rendered as text, not executed.\n\n# DANGEROUS (DO NOT DO THIS with untrusted input):\n# <%= @post.title.html_safe %>\n# Output: My <script>alert('XSS!');</script> Post\n# The script would be executed by the browser.",
    "scoringCriteria": {
      "0": "No response or unfamiliar with XSS",
      "25": "Knows XSS involves scripts but cannot explain attack or protection",
      "50": "Explains XSS attack but vague on Rails' auto-escaping",
      "75": "Explains attack, auto-escaping, and mentions html_safe danger",
      "100": "Full explanation: attack types, ERB escaping, html_safe/raw risks, edge cases"
    }
  },
  {
    "id": 27,
    "category": "Active Record / Polymorphic Associations / File Uploads",
    "level": "mid",
    "title": "User Profile with Polymorphic Media Library",
    "question": "You are building a social profile feature. A `User` has a `Profile`, and both `User` and `Profile` can have various media (images, videos) associated with them. Specifically:\n  - A `User` can have a `profile_picture` (Image) and a `video_presentation` (Video).\n  - A `Profile` can have a `background_image` (Image).\n  - A `Profile` also stores `bio` and `social_links` (as a JSONB hash).\n\nDesign the models, associations (including polymorphic for media), and controller logic to handle the creation and updating of a user's profile and its associated media. Assume you are using Active Storage for file uploads.\n\nProvide the migrations, model definitions, and a conceptual controller action for updating a user's profile and media.",
    "correctAnswer": "This exercise requires setting up `has_one_attached` for Active Storage, defining a polymorphic `MediaItem` model (or similar) if you want a dedicated model, or directly using `has_one_attached` with custom association names. For a mid-level, using `has_one_attached` directly with appropriate names is often the most Rails-idiomatic approach for simple attachments. For more complex metadata on media, a dedicated `MediaItem` model with a `has_one_attached` *inside it* would be considered more advanced.\n\nGiven the requirements, `ActiveStorage`'s `has_one_attached` with direct associations is the most straightforward and idiomatic Rails solution for a mid-level, handling polymorphic-like behavior by having distinct `has_one_attached` declarations on each model.\n\n**Key Steps & Components:**\n\n1.  **Migrations:** Create `users` and `profiles` tables. For `profiles`, add `bio` and `social_links` (JSONB).\n2.  **Active Storage Setup:** Ensure `active_storage:install` has been run.\n3.  **Model Definitions:**\n    * `User`: `has_one :profile`, `has_one_attached :profile_picture`, `has_one_attached :video_presentation`.\n    * `Profile`: `belongs_to :user`, `has_one_attached :background_image`, `store_accessor` for `social_links`.\n4.  **Controller Action (conceptual):** Handle nested parameters for `profile` and separate file uploads for `user` and `profile` attachments.",
    "codeExample": "```ruby\n# --- 1. Migrations --- (Run 'rails db:migrate' after generation)\n\n# db/migrate/[timestamp]_create_users.rb\nclass CreateUsers < ActiveRecord::Migration[7.0]\n  def change\n    create_table :users do |t|\n      t.string :email, null: false, index: { unique: true }\n      t.string :username, null: false, index: { unique: true }\n      t.timestamps\n    end\n  end\nend\n\n# db/migrate/[timestamp]_create_profiles.rb\nclass CreateProfiles < ActiveRecord::Migration[7.0]\n  def change\n    create_table :profiles do |t|\n      t.references :user, null: false, foreign_key: true\n      t.text :bio\n      t.jsonb :social_links, default: {}\n      t.timestamps\n    end\n    add_index :profiles, :social_links, using: :gin # For querying JSONB\n  end\nend\n\n# --- 2. Model Definitions --- (app/models/...)\n\n# app/models/user.rb\nclass User < ApplicationRecord\n  has_one :profile, dependent: :destroy\n\n  # Active Storage attachments for User\n  has_one_attached :profile_picture # Image\n  has_one_attached :video_presentation # Video\n\n  validates :username, presence: true, uniqueness: true\n  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }\n\n  after_create :create_default_profile\n\n  private\n\n  def create_default_profile\n    create_profile!\n  end\nend\n\n# app/models/profile.rb\nclass Profile < ApplicationRecord\n  belongs_to :user\n\n  # Active Storage attachments for Profile\n  has_one_attached :background_image # Image\n\n  # For easy access to social_links JSONB hash keys\n  store_accessor :social_links, :twitter, :linkedin, :github\n\n  validates :bio, length: { maximum: 500 }\nend\n\n# --- 3. Conceptual Controller Action --- (app/controllers/users_controller.rb)\n\nclass UsersController < ApplicationController\n  before_action :authenticate_user! # Devise or similar for authentication\n  before_action :set_user, only: [:show, :edit, :update]\n\n  def show\n    # @user and @profile will be available\n  end\n\n  def edit\n    @profile = @user.profile # Ensure profile is loaded for form\n  end\n\n  def update\n    # Handle user attributes and profile attributes (nested)\n    # Handle attachment updates separately as Active Storage attaches directly to the model\n    if @user.update(user_params)\n      redirect_to @user, notice: 'Profile was successfully updated.'\n    else\n      @profile = @user.profile # Re-load for form rendering on error\n      render :edit\n    end\n  end\n\n  private\n\n  def set_user\n    # In a real app, this would be current_user for editing their own profile\n    # For this exercise, assume it's loading a user for display/admin\n    @user = User.find(params[:id])\n  end\n\n  def user_params\n    params.require(:user).permit(\n      :username,\n      :profile_picture, # Direct Active Storage attachment\n      :video_presentation, # Direct Active Storage attachment\n      profile_attributes: [\n        :id, # Needed for nested form update\n        :bio,\n        :background_image, # Direct Active Storage attachment\n        social_links: [:twitter, :linkedin, :github] # Nested hash for JSONB\n      ]\n    )\n  end\nend\n\n# --- 4. Conceptual View Form --- (app/views/users/_form.html.erb)\n\n# Note: This is simplified. In a real app, you'd use `form_with model: @user` \n# and `fields_for :profile, @user.profile` for nested attributes.\n\n\n<%= form_with(model: @user, local: true) do |form| %>\n  <div class=\"field\">\n    <%= form.label :username %><br>\n    <%= form.text_field :username %>\n  </div>\n\n  <div class=\"field\">\n    <%= form.label :profile_picture %><br>\n    <%= form.file_field :profile_picture %>\n    <% if @user.profile_picture.attached? %>\n      <%= image_tag @user.profile_picture, size: '100x100' %>\n    <% end %>\n  </div>\n\n  <div class=\"field\">\n    <%= form.label :video_presentation %><br>\n    <%= form.file_field :video_presentation %>\n    <% if @user.video_presentation.attached? %>\n      <p>Video attached: <%= @user.video_presentation.filename %></p>\n    <% end %>\n  </div>\n\n  <%= form.fields_for :profile, @user.profile do |profile_form| %>\n    <div class=\"field\">\n      <%= profile_form.label :bio %><br>\n      <%= profile_form.text_area :bio %>\n    </div>\n\n    <div class=\"field\">\n      <%= profile_form.label :background_image %><br>\n      <%= profile_form.file_field :background_image %>\n      <% if @user.profile.background_image.attached? %>\n        <%= image_tag @user.profile.background_image, size: '200x200' %>\n      <% end %>\n    </div>\n\n    <h3>Social Links</h3>\n    <div class=\"field\">\n      <%= profile_form.label :twitter %><br>\n      <%= profile_form.text_field 'social_links[twitter]' %> \n    </div>\n    <div class=\"field\">\n      <%= profile_form.label :linkedin %><br>\n      <%= profile_form.text_field 'social_links[linkedin]' %>\n    </div>\n    <div class=\"field\">\n      <%= profile_form.label :github %><br>\n      <%= profile_form.text_field 'social_links[github]' %>\n    </div>\n  <% end %>\n\n  <div class=\"actions\">\n    <%= form.submit 'Update Profile' %>\n  </div>\n<% end %>\n```",
    "image": "/images/rails/polymorphic_associations.png",
    "hasSubQuestions": true,
    "subQuestions": [
      {
        "id": 2701,
        "question": "Provide the necessary database migrations for the `User` and `Profile` models, ensuring appropriate data types and indexing. Include the `social_links` field as a `JSONB` type.",
        "correctAnswer": "```ruby\n# db/migrate/[timestamp]_create_users.rb\nclass CreateUsers < ActiveRecord::Migration[7.0]\n  def change\n    create_table :users do |t|\n      t.string :email, null: false, index: { unique: true }\n      t.string :username, null: false, index: { unique: true }\n      t.timestamps\n    end\n  end\nend\n\n# db/migrate/[timestamp]_create_profiles.rb\nclass CreateProfiles < ActiveRecord::Migration[7.0]\n  def change\n    create_table :profiles do |t|\n      t.references :user, null: false, foreign_key: true, index: { unique: true }\n      t.text :bio\n      t.jsonb :social_links, default: {}\n      t.timestamps\n    end\n    add_index :profiles, :social_links, using: :gin # For efficient querying of JSONB fields\n  end\nend\n```",
        "codeExample": "class CreateUsers < ActiveRecord::Migration[7.0]\n  def change\n    create_table :users do |t|\n      t.string :email, null: false, index: { unique: true }\n      t.string :username, null: false, index: { unique: true }\n      t.timestamps\n    end\n  end\nend\n\nclass CreateProfiles < ActiveRecord::Migration[7.0]\n  def change\n    create_table :profiles do |t|\n      t.references :user, null: false, foreign_key: true, index: { unique: true }\n      t.text :bio\n      t.jsonb :social_links, default: {}\n      t.timestamps\n    end\n    add_index :profiles, :social_links, using: :gin # For querying JSONB\n  end\nend"
      },
      {
        "id": 2702,
        "question": "Define the `User` and `Profile` models, including their associations and the necessary Active Storage declarations for `profile_picture`, `video_presentation`, and `background_image`. How would you make `social_links` easily accessible as individual fields (e.g., `profile.twitter`)?",
        "correctAnswer": "```ruby\n# app/models/user.rb\nclass User < ApplicationRecord\n  has_one :profile, dependent: :destroy # If user is deleted, profile should be too\n\n  # Active Storage attachments for User\n  has_one_attached :profile_picture \n  has_one_attached :video_presentation\n\n  validates :username, presence: true, uniqueness: true\n  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }\n\n  # Automatically create a profile when a user is created\n  after_create :create_default_profile\n\n  private\n\n  def create_default_profile\n    create_profile!\n  end\nend\n\n# app/models/profile.rb\nclass Profile < ApplicationRecord\n  belongs_to :user\n\n  # Active Storage attachments for Profile\n  has_one_attached :background_image\n\n  # Allows direct access to JSONB keys as if they were attributes\n  store_accessor :social_links, :twitter, :linkedin, :github\n\n  validates :bio, length: { maximum: 500 }, allow_blank: true\nend\n```\n\n**Explanation for `social_links`:** The `store_accessor :social_links, :twitter, :linkedin, :github` line in the `Profile` model (available in Active Record for `json` and `jsonb` columns) allows you to read and write directly to `profile.twitter`, `profile.linkedin`, etc., transparently interacting with the underlying `social_links` JSONB hash. This provides a clean interface without manual `profile.social_links['twitter']` calls.",
        "codeExample": "class User < ApplicationRecord\n  has_one :profile, dependent: :destroy\n\n  has_one_attached :profile_picture\n  has_one_attached :video_presentation\n\n  validates :username, presence: true, uniqueness: true\n  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }\n\n  after_create :create_default_profile\n\n  private\n\n  def create_default_profile\n    create_profile!\n  end\nend\n\nclass Profile < ApplicationRecord\n  belongs_to :user\n\n  has_one_attached :background_image\n\n  store_accessor :social_links, :twitter, :linkedin, :github\n\n  validates :bio, length: { maximum: 500 }, allow_blank: true\nend"
      },
      {
        "id": 2703,
        "question": "Write a conceptual `update` action in a `UsersController` that handles updating both `User` attributes, nested `Profile` attributes (including `bio` and `social_links`), and all three Active Storage attachments. Include the necessary strong parameters method.",
        "correctAnswer": "```ruby\nclass UsersController < ApplicationController\n  before_action :authenticate_user! # Assumes Devise or similar for current_user\n  before_action :set_user, only: [:show, :edit, :update]\n\n  def show\n    # The @user and its @profile are available after set_user\n  end\n\n  def edit\n    @profile = @user.profile # Ensure profile is loaded for forms\n  end\n\n  def update\n    # Use nested attributes for profile, and directly handle Active Storage attachments\n    if @user.update(user_params)\n      redirect_to @user, notice: 'Profile was successfully updated.'\n    else\n      @profile = @user.profile # Re-load profile for rendering the form again on error\n      render :edit\n    end\n  end\n\n  private\n\n  def set_user\n    @user = current_user # Or User.find(params[:id]) if allowing editing other users\n  end\n\n  def user_params\n    params.require(:user).permit(\n      :username,\n      :profile_picture, # Active Storage attachment for User\n      :video_presentation, # Active Storage attachment for User\n      profile_attributes: [ # Nested attributes for the associated Profile\n        :id, # Crucial for updating an existing associated record via accepts_nested_attributes_for\n        :bio,\n        :background_image, # Active Storage attachment for Profile\n        social_links: [:twitter, :linkedin, :github] # Nested hash for JSONB\n      ]\n    )\n  end\nend\n```\n\n**Key considerations:**\n-   `accepts_nested_attributes_for :profile` is implicitly handled by Rails if you define `profile_attributes` in strong parameters and include `:id` for existing records. If the profile doesn't exist, Rails would create it. Since we create it with `after_create`, it will always exist and be updated.\n-   Active Storage attachments are permitted directly as top-level parameters for the `User` and within `profile_attributes` for the `Profile`.\n-   The `social_links` JSONB hash is permitted as a nested hash.",
        "codeExample": "class UsersController < ApplicationController\n  before_action :authenticate_user!\n  before_action :set_user, only: [:show, :edit, :update]\n\n  def update\n    if @user.update(user_params)\n      redirect_to @user, notice: 'Profile was successfully updated.'\n    else\n      @profile = @user.profile # Ensure profile is loaded for form re-render\n      render :edit\n    end\n  end\n\n  private\n\n  def set_user\n    @user = current_user # Assuming current_user is the user to be updated\n  end\n\n  def user_params\n    params.require(:user).permit(\n      :username,\n      :profile_picture,\n      :video_presentation,\n      profile_attributes: [\n        :id, \n        :bio,\n        :background_image,\n        social_links: [:twitter, :linkedin, :github]\n      ]\n    )\n  end\nend"
      },
      {
        "id": 2704,
        "question": "Describe how you would display the `profile_picture` on the user's profile page and allow a user to delete their `video_presentation` through a form. Consider both the view code and any necessary controller/model adjustments.",
        "correctAnswer": "**Displaying `profile_picture` (View):**\nIn `app/views/users/show.html.erb`:\n```erb\n<% if @user.profile_picture.attached? %>\n  <%= image_tag @user.profile_picture, size: '200x200', alt: \"#{@user.username}'s profile picture\" %>\n<% else %>\n  <p>No profile picture uploaded.</p>\n<% end %>\n```\n\n**Deleting `video_presentation` (View & Controller/Model):**\n\n**View (`app/views/users/edit.html.erb`):**\nTo delete an Active Storage attachment, you typically use a checkbox in the form with a `_destroy` attribute (if using `accepts_nested_attributes_for` for a separate attachment model) or a direct method call from the controller after checking a parameter.\n\nFor `has_one_attached`, a common pattern is to have a separate checkbox that signals deletion:\n```erb\n<% if @user.video_presentation.attached? %>\n  <p>Current video: <%= @user.video_presentation.filename %></p>\n  <%= form.check_box :remove_video_presentation %>\n  <%= form.label :remove_video_presentation, \"Remove video presentation\" %>\n<% end %>\n<%= form.file_field :video_presentation %>\n```\n\n**Controller (`app/controllers/users_controller.rb` - update action):**\nYou would need to permit `remove_video_presentation` in strong parameters and then handle the logic in the controller.\n\n```ruby\nclass UsersController < ApplicationController\n  # ... (other actions and before_actions) ...\n\n  def update\n    if user_params[:remove_video_presentation] == '1' && @user.video_presentation.attached?\n      @user.video_presentation.purge # Deletes the file\n    end\n\n    if @user.update(user_params.except(:remove_video_presentation))\n      redirect_to @user, notice: 'Profile was successfully updated.'\n    else\n      @profile = @user.profile\n      render :edit\n    end\n  end\n\n  private\n\n  def user_params\n    params.require(:user).permit(\n      :username,\n      :profile_picture,\n      :video_presentation,\n      :remove_video_presentation, # Permit this new param\n      profile_attributes: [\n        :id,\n        :bio,\n        :background_image,\n        social_links: [:twitter, :linkedin, :github]\n      ]\n    )\n  end\nend\n```\n\n**Alternative (Direct Purge):**\nFor simple deletions, especially outside a form submission, you might provide a separate `DELETE` route and action:\n\n**Routes (`config/routes.rb`):**\n`resources :users do member { delete :purge_video_presentation } end`\n\n**View (`app/views/users/show.html.erb`):**\n```erb\n<% if @user.video_presentation.attached? %>\n  <%= link_to 'Remove Video', purge_video_presentation_user_path(@user), method: :delete, data: { confirm: 'Are you sure?' } %>\n<% end %>\n```\n\n**Controller (`app/controllers/users_controller.rb`):**\n```ruby\nclass UsersController < ApplicationController\n  # ...\n  def purge_video_presentation\n    @user = current_user # Or find based on params[:id]\n    @user.video_presentation.purge # Deletes the file\n    redirect_to edit_user_path(@user), notice: 'Video presentation removed.'\n  end\nend\n```",
        "codeExample": "# --- Displaying profile_picture (View) ---\n<% if @user.profile_picture.attached? %>\n  <%= image_tag @user.profile_picture, size: '200x200', alt: \"#{@user.username}'s profile picture\" %>\n<% else %>\n  <p>No profile picture uploaded.</p>\n<% end %>\n\n# --- Deleting video_presentation (View & Controller) ---\n# In app/views/users/edit.html.erb:\n<%= form_with(model: @user, local: true) do |form| %>\n  \n\n  <% if @user.video_presentation.attached? %>\n    <p>Current video: <%= @user.video_presentation.filename %></p>\n    <%= form.check_box :remove_video_presentation %>\n    <%= form.label :remove_video_presentation, \"Remove video presentation\" %>\n  <% end %>\n  <%= form.file_field :video_presentation %>\n\n  <%= form.submit 'Update Profile' %>\n<% end %>\n\n# In app/controllers/users_controller.rb:\nclass UsersController < ApplicationController\n  # ...\n  def update\n    # Handle deletion flag before updating other attributes\n    if user_params[:remove_video_presentation] == '1' && @user.video_presentation.attached?\n      @user.video_presentation.purge # Deletes the attached file\n    end\n\n    # Update user with remaining permitted parameters\n    if @user.update(user_params.except(:remove_video_presentation))\n      redirect_to @user, notice: 'Profile was successfully updated.'\n    else\n      @profile = @user.profile # Reload profile for form\n      render :edit\n    end\n  end\n\n  private\n  def user_params\n    params.require(:user).permit(\n      :username,\n      :profile_picture,\n      :video_presentation,\n      :remove_video_presentation, # Permit this new boolean field\n      profile_attributes: [\n        :id,\n        :bio,\n        :background_image,\n        social_links: [:twitter, :linkedin, :github]\n      ]\n    )\n  end\nend"
      }
    ]
  },
  {
    "id": 30,
    "category": "Blocks, Procs, Lambdas",
    "level": "mid",
    "title": "Blocks, Procs, and Lambdas",
    "question": "What is the difference between a block, a proc, and a lambda?",
    "correctAnswer": "All three are mechanisms for passing executable code around, but they differ in how they handle **return** and **argument arity** (the number of arguments they expect). \n\n1.  **Block:** A code chunk associated with a method call (e.g., passed to `each`). It is **not** an object itself and cannot be stored in a variable, though it can be converted to a `Proc` object using `&`.\n2.  **Proc:** A stored, callable object. Procs have **lenient** argument arity; they ignore extra arguments and set missing ones to `nil`. Their `return` keyword attempts to return *from the context where the Proc was defined* (non-local return), which can exit the surrounding method.\n3.  **Lambda:** A stored, callable object that is a stricter form of a Proc. Lambdas have **strict** argument arity; they raise an error if the incorrect number of arguments is passed. Their `return` keyword returns *from the lambda itself*, allowing execution to continue in the defining method (local return). A lambda is effectively a Proc object where `lambda?` returns `true`.",
    "codeExample": "my_proc = Proc.new { |a, b| a + b rescue 'Proc' } # Lenient\nmy_lambda = lambda { |a, b| a + b } # Strict\n\nputs my_proc.call(1, 2, 3) # Output: 3 (Ignores 3)\n# puts my_lambda.call(1, 2, 3) # Raises ArgumentError\n\ndef proc_test\n  p = Proc.new { return \"Proc Return!\" }\n  p.call\n  \"Method Return\"\nend\n\ndef lambda_test\n  l = lambda { return \"Lambda Return!\" }\n  result = l.call\n  \"Method Return: #{result}\"\nend\n\nputs proc_test # Output: Proc Return! (Exits proc_test)\nputs lambda_test # Output: Method Return: Lambda Return! (Returns from lambda, continues method)",
    "scoringCriteria": {
      "0": "No response or confuses all three concepts",
      "25": "Knows blocks exist but cannot differentiate proc/lambda",
      "50": "Can explain blocks and procs but misses lambda differences",
      "75": "Explains all three with arity OR return behavior differences",
      "100": "Full explanation: arity differences, return behavior, block-to-proc conversion with &"
    }
  },
  {
    "id": 32,
    "category": "Modules and Mixins",
    "level": "mid",
    "title": "Purpose of Modules",
    "question": "What are Ruby modules used for?",
    "correctAnswer": "Ruby **Modules** are a way to bundle up methods, classes, and constants. Unlike **Classes**, you cannot create instances of a Module (you cannot call `Module.new`). Their two primary use cases are:\n\n1.  **Namespacing:** Modules prevent name collisions by grouping related classes and methods under a common name. This keeps the global namespace clean (e.g., `Net::HTTP` vs. `HTTP`).\n2.  **Mixins (Sharing Functionality):** Modules allow classes to share methods without using class inheritance. By including a Module (`include`), a class gains all the Module's instance methods (via the inheritance chain). By extending a Module (`extend`), an object gains the Module's methods as singleton methods. This is Ruby's powerful alternative to multiple inheritance.",
    "codeExample": "# 1. Namespacing\nmodule Reporting\n  class Report; end\nend\nputs Reporting::Report.class # Output: Class\n\n# 2. Mixin (Sharing functionality)\nmodule Printable\n  def print_details\n    puts \"Printing details for #{self.class}\"\n  end\nend\n\nclass Book\n  include Printable # Adds print_details as an instance method\nend\n\nBook.new.print_details # Output: Printing details for Book",
    "scoringCriteria": {
      "0": "No response or confuses modules with classes",
      "25": "Knows modules exist but cannot explain their purpose",
      "50": "Mentions one use case (namespacing OR mixins) only",
      "75": "Explains both namespacing and mixins with examples",
      "100": "Full explanation: both use cases, include vs extend, cannot instantiate modules"
    }
  },
  {
    "id": 34,
    "category": "OOP Concepts",
    "level": "mid",
    "title": "Inheritance vs. Mixins",
    "question": "In Ruby, how do **inheritance** (using `<` operator) and **mixins** (using `include`) differ in terms of code reuse and class hierarchy? Provide a scenario where one is clearly preferred over the other.",
    "correctAnswer": "Inheritance establishes an **'is-a'** relationship, where a subclass inherits all methods and attributes from a single superclass, creating a deep, rigid hierarchy (e.g., A `Dog` *is-a* `Animal`). Ruby enforces **single inheritance**, meaning a class can only inherit from one parent.\n\nMixins (via `include`) establish a **'has-a'** or **'can-do'** relationship. They inject instance methods from a module into a class, allowing classes to share behavior without sharing a parent class. This resolves the multiple inheritance problem. Mixins are preferable when sharing a specific capability (e.g., a `Dog` and a `Car` can both be `Printable`). Inheritance is preferred when modeling a strong hierarchical relationship.",
    "codeExample": "# Inheritance (Is-A)\nclass Animal; def speak; end; end\nclass Dog < Animal; end\n\n# Mixin (Can-Do)\nmodule Flyable; def fly; end; end\nclass Bird; include Flyable; end\n\n# Dog.new.respond_to?(:fly) # => false\n# Bird.new.respond_to?(:fly) # => true",
    "scoringCriteria": {
      "0": "No response or confuses inheritance with mixins",
      "25": "Knows both exist but cannot explain differences",
      "50": "Explains one concept well but not the other",
      "75": "Explains is-a vs can-do, mentions single inheritance limitation",
      "100": "Full explanation with scenarios, mentions include/extend, ancestor chain impact"
    }
  },
  {
    "id": 37,
    "category": "OOP Concepts",
    "level": "mid",
    "title": "Access Modifiers: Public, Private, Protected",
    "question": "Differentiate between **public**, **private**, and **protected** access modifiers in Ruby methods, specifically explaining how **private** and **protected** differ in terms of accessibility by inherited classes and sibling instances.",
    "correctAnswer": "In Ruby, access modifiers control where a method can be called from:\n\n1.  **Public (Default):** Methods can be called by **any object** (including the object itself, inherited classes, and external objects).\n2.  **Private:** Methods can **only be called without an explicit receiver** (i.e., only by `self`). They cannot be called with a receiver like `obj.private_method`. This means they can be called from inherited classes, but only implicitly.\n3.  **Protected:** Methods can be called by the object itself (`self`) **or** by any other instance of the object's defining class or its descendant classes. Protected methods can be called with an explicit receiver, provided the receiver is a sibling or ancestor instance (e.g., `other_instance.protected_method`). Protected is primarily used for comparison or collaboration between sibling instances.",
    "codeExample": "class Person\n  def public_method; private_method; end\n  \n  protected\n  def protected_method(other)\n    # Can be called with an explicit receiver, provided it's a Person or subclass\n    self.salary == other.salary \n  end\n\n  private\n  def private_method\n    # Only callable implicitly (without self) within the class scope\n    puts \"Private call\"\n  end\nend\n\np1 = Person.new\n# p1.private_method # => NoMethodError (illegal receiver)\np1.public_method # => Private call\n",
    "scoringCriteria": {
      "0": "No response or unfamiliar with access modifiers",
      "25": "Knows public/private exist but cannot differentiate properly",
      "50": "Can explain public and private but misses protected nuances",
      "75": "Explains all three with receiver rules for private",
      "100": "Full explanation: receiver rules, sibling instance access for protected, inheritance behavior"
    }
  },
  {
    "id": 40,
    "category": "Rails Core",
    "level": "mid",
    "title": "Rack and Rails Interaction",
    "question": "What is Rack and where does Rails interact with it?",
    "correctAnswer": "A **Rack** is a minimal, standard Ruby interface that serves as a layer between web servers (like Puma, Unicorn) and Ruby web frameworks (like Rails, Sinatra). It defines a simple API: an object that responds to `call(env)` and returns a three-element array: `[status, headers, body]`. **Rails** is built as a Rack application. Rails interacts with Rack through the **middleware stack**, a configurable pipeline of small components that process the request before it reaches the Rails router and process the response before it reaches the server. ",
    "codeExample": "# The core Rack entry point for a Rails app\n# config.ru (Rack configuration file)\nrequire_relative 'config/environment'\nrun Rails.application\n\n# Example of inserting a middleware\n# config/application.rb\n# config.middleware.use Rack::Attack\n\n# A simple Rack app example (must respond to #call)\nclass SimpleRackApp\n  def call(env)\n    [200, { 'Content-Type' => 'text/plain' }, ['Hello, Rack!']]\n  end\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with Rack",
      "25": "Heard of Rack but cannot explain what it does",
      "50": "Knows Rack connects server and app but vague on details",
      "75": "Explains call(env), [status, headers, body] interface",
      "100": "Full explanation: interface spec, middleware stack, config.ru, Rails as Rack app"
    }
  },
  {
    "id": 42,
    "category": "Active Record / Performance",
    "level": "mid",
    "title": "Diagnosing and Fixing N+1",
    "question": "Explain how to diagnose and fix an N+1 query in a legacy codebase.",
    "correctAnswer": "To **diagnose**, first check the **Rails log file** for many identical, consecutive `SELECT` queries occurring within a loop. More efficiently, use a tool like the **Bullet gem** (which throws alerts during development), or an APM tool (e.g., Skylight, New Relic) that highlights inefficient database calls. To **fix**, analyze the repeated query to find the association being accessed. Then, add **eager loading** to the initial query using the appropriate method: **`.includes(:association_name)`** (the standard fix), **`.preload(:association_name)`** (forces separate queries, good for avoiding join complexity), or **`.eager_load(:association_name)`** (forces `LEFT OUTER JOIN`).",
    "codeExample": "# Legacy Code (N+1 Problem):\nposts = Post.limit(10)\nposts.each do |post|\n  puts post.author.name # Triggers 1 SELECT query for each of the 10 posts\nend\n\n# Solution:\nposts = Post.includes(:author).limit(10)\nposts.each do |post|\n  puts post.author.name # No extra queries\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with N+1 queries",
      "25": "Heard of N+1 but cannot explain how to detect it",
      "50": "Can identify N+1 in logs but unsure how to fix",
      "75": "Explains diagnosis and mentions includes for fixing",
      "100": "Full explanation: log analysis, Bullet gem, includes/preload/eager_load differences"
    }
  },
  {
    "id": 48,
    "category": "Background Jobs",
    "level": "mid",
    "title": "ActiveJob vs. Sidekiq vs. DelayedJob",
    "question": "What is the difference between Sidekiq, DelayedJob, and ActiveJob?",
    "correctAnswer": "**ActiveJob** is a standardization layer introduced by Rails. It provides a common API for defining and running background jobs, allowing the underlying queuing backend to be swapped easily. **Sidekiq** and **DelayedJob** are concrete queueing backends that implement the ActiveJob API (they are the *adapters*).\n\n* **Sidekiq:** Uses **Redis** as its backend. It is **multi-threaded**, making it very fast and efficient for high-throughput applications. It includes robust features like scheduling and advanced retry handling (often using a dedicated web UI). \n* **DelayedJob:** Typically uses a **database table** (Active Record) as its backend. It is **single-threaded** and generally slower but is simpler to set up, making it suitable for smaller applications or low-volume tasks.",
    "codeExample": "# ActiveJob Abstraction\nclass ProcessOrderJob < ApplicationJob\n  queue_as :default\n\n  def perform(order)\n    # Job logic here\n  end\nend\n\n# ActiveJob uses the configured adapter (Sidekiq or DelayedJob)\nProcessOrderJob.perform_later(Order.last)\n\n# config/application.rb\n# config.active_job.queue_adapter = :sidekiq \n# config.active_job.queue_adapter = :delayed_job ",
    "scoringCriteria": {
      "0": "No response or unfamiliar with background jobs",
      "25": "Knows background jobs exist but confuses the three",
      "50": "Can explain one or two but not the relationship",
      "75": "Explains ActiveJob as abstraction, Sidekiq/DJ as adapters",
      "100": "Full explanation: abstraction layer, Redis vs DB backends, threading, performance trade-offs"
    }
  },
  {
    "id": 51,
    "category": "Monitoring",
    "level": "mid",
    "title": "Tracking Slow Requests and SQL",
    "question": "How do you track slow requests or SQL time?",
    "correctAnswer": "**1. APM Tools:** Use tools like **New Relic**, **Skylight**, or **Datadog** (with Rails instrumentation). These provide centralized dashboards, trace individual requests, and automatically flag the slowest database queries and controller actions (the 'bottlenecks'). **2. Logs:** Analyze the standard Rails logs. By default, Rails reports the total request time, view rendering time, and database time. **3. Development Tools:** Use gems like **`rack-mini-profiler`** in development/staging to see execution times inline. **4. Database Analysis:** For slow SQL, use the **`EXPLAIN ANALYZE`** command directly on the database to diagnose the query execution plan, as this shows the actual cost of fetching and joining data.",
    "codeExample": "# Rails Log Output Example\n# The final line shows the breakdown of the total time (50ms)\n# and the time spent on the database (DB: 30.5ms)\n# and view rendering (View: 10.2ms).\n\n# Completed 200 OK in 50ms (Views: 10.2ms | ActiveRecord: 30.5ms)\n\n# Adding manual instrumentation for custom metrics\nActiveSupport::Notifications.instrument(\"process.calculation\") do\n  # ... complex calculation\nend\n# This custom metric can then be reported to APM tools.",
    "scoringCriteria": {
      "0": "No response or unfamiliar with performance monitoring",
      "25": "Mentions logs but no specific techniques",
      "50": "Knows Rails logs show timing but unfamiliar with APM tools",
      "75": "Mentions APM tools (New Relic, etc.) and log analysis",
      "100": "Full approach: APM tools, log analysis, rack-mini-profiler, EXPLAIN ANALYZE"
    }
  },
  {
    "id": 53,
    "category": "Testing",
    "level": "mid",
    "title": "Rails Test Types",
    "question": "What's the difference between unit, functional, integration, and system tests in Rails?",
    "correctAnswer": "In Rails, tests are categorized by the scope and layers of the application they involve: \n\n* **Unit Tests:** Test a single, isolated component (e.g., a **Model method** or a **PORO Service Object**). They don't touch the database or network. \n* **Functional Tests (Controller Specs):** Test a single controller action's response (before Rails 5). \n* **Integration Tests:** Test the interaction between several application components (e.g., Controller talking to a Model and the Database, testing a custom route or a middleware interaction). \n* **System Tests (Feature Tests):** Test the application from the **end-user's perspective** using a real browser simulator (like Capybara). They cover the entire stack, including JavaScript, layout, and external API calls (when not stubbed).",
    "codeExample": "# Unit Test (Model)\nRSpec.describe User do\n  it 'calculates age correctly' do\n    user = User.new(dob: 20.years.ago)\n    expect(user.age).to eq(20)\n  end\nend\n\n# System Test (User-level flow)\nRSpec.feature 'User Checkout' do\n  scenario 'user successfully completes checkout' do\n    visit '/cart'\n    click_button 'Proceed to Checkout'\n    # Asserts browser behavior, JS, and final outcome\n    expect(page).to have_content('Order Confirmed')\n  end\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with test types",
      "25": "Knows tests exist but cannot differentiate types",
      "50": "Can explain unit tests but vague on integration/system",
      "75": "Explains unit, integration, and system test differences",
      "100": "Full explanation: all four types, scope differences, Capybara for system tests"
    }
  },
  {
    "id": 6,
    "category": "Active Record / Performance",
    "level": "senior",
    "title": "Eager Loading Methods Comparison",
    "question": "Differentiate between the Active Record eager loading methods `includes`, `preload`, and `joins`. Describe the fundamental mechanism (e.g., SQL clause, number of queries) for each, and identify the primary use case where each method is most appropriate.",
    "correctAnswer": "The primary difference lies in their **mechanism** and **purpose**:\n\n1.  **`includes` (Mechanism: Intelligent Eager Loading):** Active Record decides whether to use a single `LEFT OUTER JOIN` or two separate `SELECT` queries (`preload` strategy). It uses a join if it detects a condition (like `where` or `order`) that relies on the associated table; otherwise, it uses separate queries. **Purpose:** The most common way to resolve the N+1 query problem by guaranteeing the associated objects are loaded while allowing flexibility in query generation. Best for general eager loading.\n2.  **`preload` (Mechanism: Separate Queries):** Always executes a separate `SELECT` query for the associated records. For $N$ parent records, it's typically $1$ query for the parents and $1$ query for the association. **Purpose:** Eager loading without using a `JOIN`. It is ideal when you need to avoid the potential performance penalty of a large intermediate result set created by a `LEFT OUTER JOIN` or when querying through a `has_many :through` association. Best for avoiding joins.\n3.  **`joins` (Mechanism: `INNER JOIN`):** Adds an `INNER JOIN` to the SQL query. **Purpose:** It is primarily used for **filtering** the parent records based on conditions in the associated table (e.g., find all Authors who have books published in 2024). **Crucially, `joins` does not eagerly load the association.** If you access the association later, it will still trigger an N+1 query. Best for filtering or ordering on associations without needing to access them.",
    "codeExample": "# Author with books published in 2024\nAuthor.joins(:books).where(books: { published_year: 2024 })\n\n# Eagerly load books for all authors\nAuthor.includes(:books).all\n\n# Force preload (separate queries) to load books\nAuthor.preload(:books).all\n\n# N+1 still occurs with joins:\nauthors = Author.joins(:books).limit(10)\nauthors.each { |a| a.books.first.title } # N+1 queries here, association not loaded by joins",
    "scoringCriteria": {
      "0": "No response or confuses all three methods",
      "25": "Knows includes exists but cannot differentiate from others",
      "50": "Can explain includes and joins but misses preload",
      "75": "Explains all three with SQL mechanisms (JOIN types, queries)",
      "100": "Full explanation: mechanisms, use cases, when includes uses JOIN vs separate queries"
    }
  },
  {
    "id": 8,
    "category": "Metaprogramming",
    "level": "senior",
    "title": "Singleton Class and Methods",
    "question": "What is the **singleton class** (also known as the eigenclass) in Ruby? Explain its purpose, and how it relates to defining **singleton methods** (or class methods) on an object.",
    "correctAnswer": "The **singleton class** is an anonymous class that Ruby automatically creates for **every object** when a singleton method is first defined on that object. Its purpose is to hold the object's singleton methods (methods unique to that single instance). The singleton class sits directly in the object's ancestor chain, before its actual class. When a message is sent to an object, Ruby searches the object's methods, then its singleton class methods, then its actual class, and so on up the inheritance chain. \n\n**Singleton methods** are instance methods defined specifically on the singleton class of a single object, ensuring they are only available to that object. For a class object (`MyClass`), its singleton methods are essentially its **class methods** (e.g., `MyClass.find`).",
    "codeExample": "class MyClass; end\nobj = MyClass.new\n\n# Define a singleton method on 'obj'\ndef obj.special_method\n  'Only on this object'\nend\n\n# Accessing the singleton class of obj\nputs obj.singleton_class # => #<Class:#<MyClass:0x...>>\n\n# Class methods are singleton methods on the Class object\nclass MyClass\n  class << self\n    def class_method\n      'Class level'\n    end\n  end\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with singleton class concept",
      "25": "Heard of eigenclass but cannot explain its purpose",
      "50": "Understands singleton methods but not the underlying class",
      "75": "Explains singleton class purpose and method lookup chain",
      "100": "Full explanation: eigenclass creation, class << self syntax, class methods as singleton methods"
    }
  },
  {
    "id": 9,
    "category": "Metaprogramming",
    "level": "senior",
    "title": "Method Missing and Dynamic Dispatch",
    "question": "Explain the role of the `method_missing` method in Ruby. Describe how it enables **dynamic dispatch** and list the necessary helper method that should always be overridden alongside it.",
    "correctAnswer": "The `method_missing` method is part of Ruby's **dynamic dispatch** mechanism. When an object receives a message (method call) for which it has no defined instance method (in its class or ancestor chain), Ruby intercepts the call and executes `method_missing`. This method receives the name of the missing method, the arguments, and an optional block.\n\n**Purpose:** It allows developers to handle undefined methods dynamically, enabling features like DSLs (Domain Specific Languages), proxy objects, and dynamic attribute accessors (e.g., Active Record's dynamic finders).\n\nThe essential helper method to override alongside `method_missing` is **`respond_to_missing?`**. This ensures that introspection methods like `respond_to?` and `methods` correctly report that the object *can* respond to the dynamically handled method, which is critical for good programming practice and avoiding bugs in external libraries.",
    "codeExample": "class DynamicAttributes\n  def method_missing(method_name, *args)\n    if method_name.to_s.start_with?('find_by_')\n      puts \"Dynamically finding record by #{method_name}\"\n    else\n      super\n    end\n  end\n\n  def respond_to_missing?(method_name, include_private = false)\n    method_name.to_s.start_with?('find_by_') || super\n  end\nend\n\nd = DynamicAttributes.new\nd.find_by_email # => Dynamically finding record by find_by_email\nputs d.respond_to?(:find_by_name) # => true",
    "scoringCriteria": {
      "0": "No response or unfamiliar with method_missing",
      "25": "Knows method_missing exists but cannot explain mechanism",
      "50": "Can explain method_missing but forgets respond_to_missing?",
      "75": "Explains both methods and their relationship",
      "100": "Full explanation: dispatch mechanism, DSL use cases, respond_to_missing? importance, calling super"
    }
  },
  {
    "id": 11,
    "category": "OOP Concepts",
    "level": "senior",
    "title": "The Role of `super`",
    "question": "What is the `super` keyword used for in Ruby? Describe the difference between calling `super` with parentheses and calling `super` without parentheses, and explain which one is generally considered safer.",
    "correctAnswer": "The `super` keyword is used within a method definition in a subclass to call the method of the **same name** in the **immediate superclass**.\n\n* **`super()` (With Parentheses):** Calls the superclass method **without any arguments**, regardless of what arguments the current method received. \n* **`super` (Without Parentheses):** Calls the superclass method, automatically passing **all arguments** received by the current method. If the current method was called with a block, the block is also implicitly passed to the superclass method.\n\nCalling **`super` without parentheses** is generally considered **safer** (especially in initialization/constructor methods) because it dynamically matches the argument list. If the superclass's method signature changes, the subclass method using `super` may not need updating, whereas `super()` would fail if the superclass started requiring arguments.",
    "codeExample": "class Parent\n  def initialize(name, age:)\n    @name = name\n    @age = age\n  end\nend\n\nclass Child < Parent\n  # The safest way to chain constructors\n  def initialize(name, age:, specialty)\n    super # Automatically passes name and age: to Parent#initialize\n    @specialty = specialty\n  end\n\n  def report\n    puts \"Name: #{@name}, Age: #{@age}, Specialty: #{@specialty}\"\n  end\nend\n\nChild.new(\"Alice\", age: 5, specialty: \"Painting\").report",
    "scoringCriteria": {
      "0": "No response or unfamiliar with super keyword",
      "25": "Knows super calls parent method but confused on syntax",
      "50": "Explains basic super usage but misses parentheses difference",
      "75": "Correctly explains super() vs super argument passing",
      "100": "Full explanation: argument forwarding, block passing, safety considerations"
    }
  },
  {
    "id": 12,
    "category": "Active Record / Transactions",
    "level": "senior",
    "title": "Database Transactions in Rails",
    "question": "When and why would you use `ActiveRecord::Base.transaction`? Describe its behavior, including how it handles exceptions and nested transactions.",
    "correctAnswer": "Transactions ensure atomicity: a series of database operations either all succeed or all fail, leaving the database in a consistent state. You use them when multiple dependent operations must be treated as a single unit (e.g., transferring money, creating an order with multiple line items). If any operation within the transaction fails or an exception is raised, all previous changes within that transaction are rolled back.\n\nBehavior:\n-   **Exceptions:** If an `ActiveRecord::Rollback` exception is raised, the transaction is rolled back, but other exceptions propagate normally. If any other exception occurs, the transaction is rolled back and the exception is re-raised.\n-   **Nested Transactions:** By default, Rails transactions don't truly nest in the database; they typically use savepoints. Only the outermost `transaction` block truly commits or rolls back to the initial state. An inner `transaction` block will create a savepoint and `ROLLBACK TO SAVEPOINT` if it fails, but the entire transaction won't be committed until the outermost block succeeds.",
    "codeExample": "ActiveRecord::Base.transaction do\n  user = User.create!(name: 'New User')\n  account = Account.create!(user: user, balance: 100)\n\n  # If this fails, both user and account creation will be rolled back\n  TransactionRecord.create!(from_account: nil, to_account: account, amount: 50)\nend\n\n# Nested Transaction Example (simplified)\nActiveRecord::Base.transaction do\n  # Outer transaction starts\n  Project.create!(name: 'Main Project')\n\n  ActiveRecord::Base.transaction do\n    # Inner transaction (often a savepoint)\n    Task.create!(name: 'Task 1', project_id: 1) # Assumed project_id exists\n    raise ActiveRecord::Rollback # Rolls back to this savepoint, but outer is still active\n  end\n\n  # Project 'Main Project' will still be committed if no other errors occur\n  puts 'Outer transaction continues'\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with transactions",
      "25": "Knows transactions exist but cannot explain atomicity",
      "50": "Explains atomicity but vague on exception handling",
      "75": "Explains use cases, rollback on exception, basic nesting",
      "100": "Full explanation: atomicity, ActiveRecord::Rollback, savepoints, nested transaction behavior"
    }
  },
  {
    "id": 13,
    "category": "Active Record / Callbacks",
    "level": "senior",
    "title": "Advanced Callbacks and Side Effects",
    "question": "Discuss the pros and cons of using Active Record callbacks (e.g., `after_save`, `before_validation`). When might you choose to avoid them, and what are common alternatives for handling complex side effects or business logic?",
    "correctAnswer": "Pros:\n-   **Encapsulation:** Keep model-related logic within the model, promoting DRY.\n-   **Automatic Execution:** Ensures certain actions always happen at specific points in an object's lifecycle.\n-   **Readability (simple cases):** Can make simple actions easy to understand.\n\nCons:\n-   **Hidden Logic:** Can lead to 'magic' where behavior is not obvious from method calls, making debugging harder.\n-   **Order Dependency:** Unpredictable order in complex chains, especially across associations.\n-   **Performance:** Can inadvertently run heavy operations on every save.\n-   **Testing Difficulty:** Harder to test in isolation without triggering unwanted side effects.\n-   **Reusability:** Callbacks are tightly coupled to the model's persistence, not easily reusable in other contexts.\n\nAvoid them when:\n-   The logic is not directly related to the model's state persistence (e.g., sending emails).\n-   The logic is complex, involves multiple models, or has significant side effects.\n-   The logic might be triggered multiple times unnecessarily.\n\nAlternatives:\n1.  **Service Objects:** Encapsulate complex business logic in plain Ruby objects. They take specific inputs, perform actions, and return results. Explicit and testable.\n2.  **Form Objects:** For handling complex form submissions, aggregation of data from multiple models.\n3.  **Command/Operation Objects:** Similar to service objects but often for a single, well-defined action.\n4.  **Event-Driven Architecture:** Publish events (`UserCreated`, `OrderPlaced`) and have other parts of the system subscribe and react to these events (e.g., using a background job system or dedicated event bus).",
    "codeExample": "# Problematic Callback:\nclass Order < ApplicationRecord\n  after_create :send_confirmation_email\n  # This sends an email on every order creation, even in tests or admin seed scripts.\n  # It's also a slow operation that blocks the request.\nend\n\n# Better with a Service Object or Background Job:\nclass OrdersController < ApplicationController\n  def create\n    @order = Order.new(order_params)\n    if @order.save\n      # Explicitly call a service or enqueue a job\n      OrderConfirmationMailer.with(order: @order).confirmation_email.deliver_later\n      redirect_to @order, notice: 'Order placed!'\n    else\n      render :new\n    end\n  end\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with callbacks",
      "25": "Knows callbacks exist but cannot discuss trade-offs",
      "50": "Mentions pros OR cons but not both",
      "75": "Discusses pros, cons, and mentions service objects as alternative",
      "100": "Full analysis: hidden logic issues, testing difficulty, service objects, form objects, event-driven alternatives"
    }
  },
  {
    "id": 14,
    "category": "Active Record / Querying",
    "level": "senior",
    "title": "Advanced Filtering and Subqueries",
    "question": "You have `User` records and `Order` records, where a User `has_many :orders`. Write an Active Record query to find all users who have placed *at least five orders* and *whose most recent order was placed within the last 30 days*. Explain the components of your query.",
    "correctAnswer": "```ruby\nUser.joins(:orders)\n    .group('users.id')\n    .having('COUNT(orders.id) >= 5')\n    .where('orders.created_at >= ?', 30.days.ago)\n    .distinct\n    .order('MAX(orders.created_at) DESC') # Optional: order by most recent order date\n```\n\n**Components Explanation:**\n-   **`User.joins(:orders)`:** Performs an `INNER JOIN` with the `orders` table. This is crucial for accessing order data.\n-   **`.group('users.id')`:** Groups the results by `user.id`. This allows us to apply aggregate functions (like `COUNT` and `MAX`) to each user's orders.\n-   **`.having('COUNT(orders.id) >= 5')`:** Filters the *grouped results* (users) to include only those who have a count of 5 or more orders. `HAVING` is used for filtering on aggregate functions, whereas `WHERE` is for individual rows.\n-   **`.where('orders.created_at >= ?', 30.days.ago)`:** Filters the *individual order records* before grouping, ensuring we only consider recent orders. If we put this in `HAVING`, it would apply to the max `created_at` after grouping.\n-   **`.distinct`:** Ensures that each user is returned only once, even if they have multiple orders that satisfy the criteria (important because of the `joins`).\n-   **`.order('MAX(orders.created_at) DESC')` (Optional):** Orders the final user list by the `created_at` date of their most recent order.",
    "codeExample": "class User < ApplicationRecord\n  has_many :orders\nend\nclass Order < ApplicationRecord\n  belongs_to :user\nend\n\n# The query:\nactive_high_volume_users = User.joins(:orders)\n                               .group('users.id')\n                               .having('COUNT(orders.id) >= ?', 5)\n                               .where('orders.created_at >= ?', 30.days.ago)\n                               .distinct\n\n# Example usage:\n# active_high_volume_users.each { |user| puts user.name }",
    "scoringCriteria": {
      "0": "No response or cannot construct the query",
      "25": "Attempts query but missing key clauses",
      "50": "Uses joins and where but struggles with having/group",
      "75": "Correct query with joins, group, having, where",
      "100": "Full explanation of each clause, mentions distinct, order options"
    }
  },
  {
    "id": 15,
    "category": "Active Record / SQL & AREL",
    "level": "senior",
    "title": "Dropping to AREL or Raw SQL",
    "question": "When would a senior developer choose to drop down from standard Active Record query methods to use AREL directly, or even raw SQL, and what are the associated risks and benefits of each approach?",
    "correctAnswer": "A senior developer would drop down to AREL or raw SQL when Active Record's standard query interface isn't expressive enough to generate the desired, complex SQL query, or when optimizing for specific database features.\n\n**AREL (Active Record Relation):**\n-   **When to use:** For complex `JOIN` conditions, intricate `CASE` statements, window functions, subqueries that return values, or when building dynamic queries programmatically where raw SQL injection is a concern.\n-   **Benefits:** Still provides some level of abstraction and database independence. Allows programmatic construction of SQL fragments, reducing risk of SQL injection compared to raw SQL. Keeps logic within Ruby.\n-   **Risks:** Higher learning curve. Can make code less readable for developers unfamiliar with AREL syntax.\n\n**Raw SQL:**\n-   **When to use:** For highly specialized, database-specific optimizations, using features not supported by Active Record/AREL, complex report generation, or when integrating with legacy systems where exact SQL is needed.\n-   **Benefits:** Complete control over the generated SQL. Can achieve maximum performance for specific scenarios. Leverages full power of the underlying RDBMS.\n-   **Risks:** Database-dependent (not portable). High risk of SQL injection if not properly sanitized (`sanitize_sql_array`). Harder to maintain and test. Bypasses Active Record's change tracking and callbacks.",
    "codeExample": "# Example using AREL for a complex JOIN condition\nposts_table = Post.arel_table\ncomments_table = Comment.arel_table\n\ncomplex_join = posts_table.join(comments_table).on(\n  posts_table[:id].eq(comments_table[:post_id])\n  .and(comments_table[:created_at].gt(1.year.ago))\n)\n\nPost.joins(complex_join.join_sources)\n\n# Example using Raw SQL (with sanitization!)\nsearch_term = 'ruby'\nPost.find_by_sql([\"SELECT * FROM posts WHERE title ILIKE ? OR body ILIKE ?\", \"%#{search_term}%\", \"%#{search_term}%\"])",
    "scoringCriteria": {
      "0": "No response or unfamiliar with AREL/raw SQL",
      "25": "Knows raw SQL exists but cannot explain when to use",
      "50": "Can explain raw SQL use cases but misses AREL benefits",
      "75": "Explains both AREL and raw SQL with appropriate use cases",
      "100": "Full analysis: AREL vs raw SQL trade-offs, sanitization, performance considerations"
    }
  },
  {
    "id": 16,
    "category": "Active Record / Associations",
    "level": "senior",
    "title": "Polymorphic Associations",
    "question": "Describe what a polymorphic association is in Active Record, when you would typically use one, and its main advantages and disadvantages compared to standard associations.",
    "correctAnswer": "A polymorphic association allows a model to belong to *more than one* other model, on a single association. For example, a `Comment` could belong to a `Post` or a `Photo`.\n\n**When to use:** When you have a common model (e.g., `Comment`, `Tag`, `Attachment`, `ActivityFeedItem`) that needs to be associated with several different types of models, without creating separate foreign keys and `belongs_to` definitions for each parent type.\n\n**Advantages:**\n-   **DRY (Don't Repeat Yourself):** Avoids duplicating columns and association definitions.\n-   **Flexibility:** Easily add new parent types without schema changes to the child model.\n-   **Scalability:** Good for generic features like comments, tags, or activity logging.\n\n**Disadvantages:**\n-   **Referential Integrity:** Databases don't directly enforce foreign key constraints for polymorphic associations, as `commentable_id` could refer to different tables. This means integrity must be handled at the application level.\n-   **Querying Complexity:** Can make some SQL queries more complex (e.g., finding all comments associated with *either* posts or photos requires `OR` clauses or multiple queries).\n-   **N+1 Problem with `includes`:** `includes` on a polymorphic association often results in multiple queries rather than a single join, as the associated tables are different types.",
    "codeExample": "# app/models/comment.rb\nclass Comment < ApplicationRecord\n  belongs_to :commentable, polymorphic: true\nend\n\n# app/models/post.rb\nclass Post < ApplicationRecord\n  has_many :comments, as: :commentable\nend\n\n# app/models/photo.rb\nclass Photo < ApplicationRecord\n  has_many :comments, as: :commentable\nend\n\n# Database Schema for comments table:\n# id: integer\n# content: text\n# commentable_id: integer\n# commentable_type: string (stores 'Post' or 'Photo')",
    "scoringCriteria": {
      "0": "No response or unfamiliar with polymorphic associations",
      "25": "Heard of polymorphic but cannot explain mechanism",
      "50": "Can explain concept but misses advantages/disadvantages",
      "75": "Explains mechanism, use cases, and mentions trade-offs",
      "100": "Full explanation: schema design, foreign key limitations, querying complexity"
    }
  },
  {
    "id": 17,
    "category": "Active Record / Data Integrity",
    "level": "senior",
    "title": "Database Constraints vs Active Record Validations",
    "question": "Discuss the trade-offs between enforcing data integrity using Active Record validations versus enforcing it at the database level (e.g., `NOT NULL`, `UNIQUE` constraints, foreign keys). When should you choose one over the other, or combine them?",
    "correctAnswer": "Active Record validations are application-level checks, while database constraints are enforced by the database itself.\n\n**Active Record Validations:**\n-   **Pros:** User-friendly error messages, flexibility (can be conditional), easily integrated with form rendering. Provide feedback *before* hitting the database.\n-   **Cons:** Can be bypassed (e.g., using `save(validate: false)`, direct SQL), not enforced for data inserted outside of Rails (e.g., raw SQL, other apps). Performance overhead for complex validations.\n\n**Database Constraints:**\n-   **Pros:** Guarantees data integrity at the lowest level, regardless of how data is inserted. Faster for simple checks (like `NOT NULL`, `UNIQUE`). Prevents corrupt data.\n-   **Cons:** Generic error messages (e.g., 'Duplicate entry for key'), harder to customize feedback for users. Less flexible (e.g., conditional unique checks are difficult).\n\n**When to use/combine:**\n-   **Combine them:** This is often the best practice. Use database constraints for fundamental integrity rules (`NOT NULL`, `UNIQUE`, foreign keys) that *must never* be violated. Use Active Record validations for user experience, complex business rules, and conditional checks.\n-   **Database-only for critical invariants:** If data integrity is paramount and cannot be bypassed under any circumstances (e.g., `unique: true` for email addresses, foreign key to prevent orphaned records).\n-   **AR-only for transient/complex logic:** For validations that depend on application state, external services, or complex business rules that don't map well to simple SQL constraints.",
    "codeExample": "# Model Validation (app/models/user.rb)\nclass User < ApplicationRecord\n  validates :email, presence: true, uniqueness: true\n  validates :password, length: { minimum: 8 }, on: :create # Conditional validation\nend\n\n# Database Migration (db/migrate/timestamp_add_email_to_users.rb)\nclass AddEmailToUsers < ActiveRecord::Migration[7.0]\n  def change\n    add_column :users, :email, :string, null: false\n    add_index :users, :email, unique: true\n    # Add a foreign key to enforce association integrity\n    # add_reference :posts, :user, foreign_key: true\n  end\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with data integrity approaches",
      "25": "Knows validations exist but unclear on database constraints",
      "50": "Can explain both but misses when to combine them",
      "75": "Explains pros/cons of each and mentions combining",
      "100": "Full analysis: bypass risks, integrity guarantees, best practice to combine both"
    }
  },
  {
    "id": 18,
    "category": "Active Record / Querying",
    "level": "senior",
    "title": "Understanding Scopes and Merge",
    "question": "You have a `Product` model with several scopes: `active`, `expensive` (price > 100), and `with_reviews`. How does chaining these scopes work in Active Record, and what does the `merge` method allow you to do with scopes?",
    "correctAnswer": "Chaining scopes in Active Record applies them sequentially, building up a more complex query. Each scope returns an `ActiveRecord::Relation` object, allowing further methods (including other scopes) to be called on it. This creates a powerful, readable, and reusable way to build queries.\n\nThe `merge` method allows you to combine the conditions, joins, orders, etc., of one `ActiveRecord::Relation` (or scope) into another. This is particularly useful when you want to dynamically apply a scope defined elsewhere, or combine scopes from different, but compatible, contexts. `merge` intelligently combines `WHERE`, `ORDER`, `LIMIT`, `OFFSET`, `FROM`, `GROUP`, and `HAVING` clauses, often using `AND` logic for `WHERE` clauses.",
    "codeExample": "class Product < ApplicationRecord\n  scope :active, -> { where(status: :active) }\n  scope :expensive, -> { where('price_in_cents > ?', 100_00) }\n  scope :with_reviews, -> { joins(:reviews).distinct }\n\n  # A separate scope for special products\n  scope :premium, -> { active.expensive }\nend\n\n# Chaining scopes:\n# Finds active products that are expensive and have reviews\nProduct.active.expensive.with_reviews \n# SQL: SELECT DISTINCT \"products\".* FROM \"products\" INNER JOIN \"reviews\" ON \"reviews\".\"product_id\" = \"products\".\"id\" WHERE \"products\".\"status\" = 0 AND (price_in_cents > 10000)\n\n# Using `merge`:\n# Imagine you have a base scope for a dashboard\nbase_products = Product.active\n\n# Later, you want to add the 'expensive' criteria\nfinal_products = base_products.merge(Product.expensive)\n# This is equivalent to Product.active.expensive",
    "scoringCriteria": {
      "0": "No response or unfamiliar with scopes",
      "25": "Knows scopes exist but cannot explain chaining",
      "50": "Can explain scope chaining but unfamiliar with merge",
      "75": "Explains both chaining and merge with examples",
      "100": "Full explanation: Relation objects, merge behavior, dynamic scope application"
    }
  },
  {
    "id": 19,
    "category": "Active Record / Performance",
    "level": "senior",
    "title": "Counter Caching",
    "question": "Explain what counter caching is and why it's a valuable performance optimization in Rails. Provide an example of how you'd set it up for a `Post` model with many `Comments`.",
    "correctAnswer": "Counter caching is a performance optimization where the count of associated records is stored directly as a column in the parent model's table. Instead of performing a `COUNT(*)` query every time you need the number of associated records, the count is simply read from a column. Rails automatically increments/decrements this counter when associated records are created or destroyed.\n\n**Why it's valuable:**\n-   **Reduces Database Queries:** Eliminates N+1 `COUNT` queries, especially common in lists or dashboards.\n-   **Faster Reads:** Reading an integer column is much faster than executing an aggregate SQL query.\n-   **Simplicity:** Rails handles the updating automatically, requiring minimal code.\n\n**Setup Example:**\n1.  **Migration:** Add a `comments_count` integer column (with a default of 0) to the `posts` table.\n2.  **Model Association:** Add `counter_cache: true` to the `belongs_to` association in the child model (`Comment`).",
    "codeExample": "# 1. Migration to add the counter cache column:\nclass AddCommentsCountToPosts < ActiveRecord::Migration[7.0]\n  def change\n    add_column :posts, :comments_count, :integer, default: 0\n  end\nend\n\n# 2. Update the Comment model (child) to enable caching:\n# app/models/comment.rb\nclass Comment < ApplicationRecord\n  belongs_to :post, counter_cache: true\nend\n\n# 3. Update the Post model (parent) - no changes needed, but often seen:\n# app/models/post.rb\nclass Post < ApplicationRecord\n  has_many :comments\nend\n\n# Usage:\npost = Post.first\nputs post.comments_count # Reads directly from the column, no query",
    "scoringCriteria": {
      "0": "No response or unfamiliar with counter caching",
      "25": "Heard of counter cache but cannot explain setup",
      "50": "Understands concept but incomplete implementation",
      "75": "Correct migration and model setup with counter_cache: true",
      "100": "Full explanation: performance benefits, migration, model setup, automatic updates"
    }
  },
  {
    "id": 20,
    "category": "Active Record / Concurrency",
    "level": "senior",
    "title": "Optimistic vs. Pessimistic Locking",
    "question": "Compare and contrast optimistic and pessimistic locking in the context of Active Record. When would you use each, and what are their mechanisms for preventing race conditions during concurrent updates?",
    "correctAnswer": "**Optimistic Locking:**\n-   **Mechanism:** Adds a `lock_version` integer column to the database table. When a record is updated, Active Record increments this version number. If another update attempt is made on an outdated version of the record (i.e., its `lock_version` in the database doesn't match the one the object was loaded with), it raises an `ActiveRecord::StaleObjectError`.\n-   **When to use:** Preferred for situations where conflicts are rare and user experience tolerates occasional re-submission (e.g., editing a blog post, where two users might coincidentally edit at the same time). It's 'optimistic' that conflicts won't occur.\n-   **Pros:** Minimal database overhead, doesn't block other users.\n-   **Cons:** Requires users to re-submit changes if a conflict occurs. Needs client-side handling of the `StaleObjectError`.\n\n**Pessimistic Locking:**\n-   **Mechanism:** Uses database-level locks (e.g., `SELECT ... FOR UPDATE` in PostgreSQL/MySQL). When a record is loaded for an update, the database places a lock on that record (or row), preventing other transactions from modifying it until the current transaction commits or rolls back.\n-   **When to use:** For critical operations where data integrity and preventing simultaneous updates is paramount, and performance impact of blocking is acceptable (e.g., deducting money from an account, managing inventory levels where an exact count is crucial). It's 'pessimistic' about conflicts.\n-   **Pros:** Guarantees no conflicts at the database level. Simpler client-side logic as no re-submission is needed.\n-   **Cons:** Can lead to deadlocks if not used carefully. Can reduce concurrency and impact performance by blocking other transactions.\n\n**Summary:** Optimistic is generally preferred for its lighter overhead and better concurrency if stale data can be handled by the application. Pessimistic is for high-integrity, low-tolerance-for-error scenarios where blocking is acceptable.",
    "codeExample": "# Optimistic Locking:\n# 1. Add lock_version column: rails g migration AddLockVersionToProducts lock_version:integer\n# 2. In Product model: validates :lock_version, presence: true (optional, but good practice)\n\nproduct1 = Product.find(1) # lock_version: 1\nproduct2 = Product.find(1) # lock_version: 1\n\nproduct1.update(price: 10)\n# Database now has product 1 with lock_version: 2\n\n# This will raise ActiveRecord::StaleObjectError because product2's lock_version (1) \n# doesn't match the database's current lock_version (2)\nbegin\n  product2.update(name: 'Updated Name')\nrescue ActiveRecord::StaleObjectError\n  puts 'Conflict detected! Please try again.'\nend\n\n# Pessimistic Locking:\nProduct.transaction do\n  product = Product.lock.find(1)\n  # The database row for product 1 is now locked\n  product.update(inventory: product.inventory - 1)\n  # Lock released when transaction commits or rolls back\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with locking strategies",
      "25": "Heard of locking but cannot differentiate types",
      "50": "Can explain one type but not the other",
      "75": "Explains both with mechanisms and use cases",
      "100": "Full comparison: lock_version, StaleObjectError, FOR UPDATE, deadlock considerations"
    }
  },
  {
    "id": 21,
    "category": "Active Record / Advanced Features",
    "level": "senior",
    "title": "When to skip Active Record and use raw SQL",
    "question": "Beyond simple queries, describe a scenario where a senior developer might decide to bypass Active Record entirely and execute raw SQL directly through `connection.execute` or `connection.select_all`. What are the primary reasons and considerations for such a decision?",
    "correctAnswer": "A senior developer might bypass Active Record entirely and use raw SQL when:\n\n1.  **Complex Reporting & Aggregations:** For highly optimized, custom reports involving intricate `GROUP BY`, `HAVING`, window functions, or complex joins across many tables that are difficult or inefficient to construct with Active Record/AREL.\n2.  **Performance Critical Operations:** When micro-optimizing specific database operations that Active Record's overhead might hinder, or when needing to leverage very specific database engine features (e.g., PostgreSQL's `jsonb` functions, specific indexing strategies, `MATERIALIZED VIEWS`).\n3.  **Bulk Operations:** For extremely large-scale data imports, updates, or deletions where loading Active Record objects into memory would be prohibitive (e.g., `INSERT ... SELECT`, `UPDATE ... FROM`).\n4.  **Database-Specific Features:** Accessing features not abstracted by Active Record, such as specific stored procedures, triggers, or advanced data types.\n5.  **Legacy Database Integration:** Interacting with a database schema that doesn't conform to Active Record's conventions, where direct SQL offers more control.\n\n**Primary Reasons & Considerations:**\n-   **Control:** Absolute control over the SQL generated.\n-   **Performance:** Potentially faster for highly optimized queries.\n-   **Flexibility:** Access to full RDBMS capabilities.\n-   **Lack of Active Record Objects:** `connection.select_all` returns an `ActiveRecord::Result` object (an array of hashes), not `ActiveRecord::Base` instances. This means no callbacks, no dirty tracking, no validations, no associations.\n-   **SQL Injection Risk:** Higher risk of SQL injection if inputs are not meticulously sanitized (`ActiveRecord::Base.sanitize_sql_array`).\n-   **Portability:** Raw SQL can be database-specific, reducing application portability.\n-   **Maintainability:** Harder to read and maintain, as it breaks the Active Record abstraction.",
    "codeExample": "# Scenario: Generating a complex weekly sales report with custom aggregations\n# that might involve combining data from multiple tables in a specific way,\n# perhaps using window functions, and for which Active Record would generate\n# less efficient or more convoluted queries.\n\n# Using connection.execute for a complex report:\nresults = ActiveRecord::Base.connection.execute(\n  <<-SQL\n    SELECT\n      users.name,\n      DATE_TRUNC('week', orders.created_at) AS week,\n      SUM(order_items.price * order_items.quantity) AS total_sales,\n      COUNT(DISTINCT orders.id) AS order_count\n    FROM users\n    JOIN orders ON orders.user_id = users.id\n    JOIN order_items ON order_items.order_id = orders.id\n    WHERE orders.created_at >= '2024-01-01'\n    GROUP BY users.id, week\n    ORDER BY total_sales DESC\n  SQL\n)\n\n# Process results (returns array of hashes)\nresults.each do |row|\n  puts \"#{row['name']}: $#{row['total_sales']} (#{row['order_count']} orders)\"\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with raw SQL in Rails",
      "25": "Knows raw SQL exists but cannot explain when appropriate",
      "50": "Can list scenarios but misses risks and considerations",
      "75": "Explains scenarios, risks (injection), and no AR objects",
      "100": "Full analysis: scenarios, sanitization, portability, maintainability trade-offs"
    }
  },
  {
    "id": 22,
    "category": "Active Record / Performance & Advanced Querying",
    "level": "senior",
    "title": "Optimizing Complex Data Retrieval with Eager Loading and SQL",
    "question": "Imagine you are working on a social media platform. You have three models: `User`, `Post`, and `Comment`. A `User` `has_many :posts` and `has_many :comments`. A `Post` `belongs_to :user` and `has_many :comments`. A `Comment` `belongs_to :user` and `belongs_to :post`.\n\nYour task is to display a dashboard showing a list of the 10 most recent posts. For each post, you need to display:\n  - The post's title and content.\n  - The author's username.\n  - The count of comments on that post.\n  - The usernames of the first 3 recent commenters on that post.\n\nWrite the Active Record query (or queries) to efficiently retrieve all necessary data for this dashboard. Focus on avoiding N+1 queries and optimizing performance.",
    "correctAnswer": "The solution involves a combination of `includes` with custom `LIMIT` and `ORDER` clauses on associations, or potentially using `LEFT JOIN` and subqueries for the most complex parts. The key is to minimize separate database hits.\n\n```ruby\nPost.includes(:user) # Eager load post authors\n    .left_joins(:comments) # Join comments to count them\n    .select(\n      'posts.*',\n      'users.username AS author_username',\n      'COUNT(comments.id) AS comments_count' # Aggregate count\n    )\n    .group('posts.id', 'users.username') # Group for COUNT\n    .order(created_at: :desc)\n    .limit(10)\n    .eager_load(recent_comments: :user) # Eager load recent comments and their authors\n```\n\n**Explanation of `eager_load` for recent comments (the trickiest part):**\nThe `eager_load` (or `includes` with a lambda) for `recent_comments` would require a custom association and scope. We'd define a `has_many :recent_comments` association on the `Post` model that limits and orders comments. `eager_load` on this specific association (or `includes` if Rails can optimize) is crucial. The `SELECT` clause with `COUNT` would handle the total comment count efficiently.\n\n**Post Model (needed for the above query):**\n```ruby\nclass Post < ApplicationRecord\n  belongs_to :user\n  has_many :comments\n  has_many :recent_comments, -> { order(created_at: :desc).limit(3) }, class_name: 'Comment'\nend\n```\n\n**SQL Generated (simplified):**\n```sql\nSELECT\n  posts.*,\n  users.username AS author_username,\n  COUNT(comments.id) AS comments_count\nFROM posts\nINNER JOIN users ON users.id = posts.user_id\nLEFT OUTER JOIN comments ON comments.post_id = posts.id\nGROUP BY posts.id, users.username\nORDER BY posts.created_at DESC\nLIMIT 10;\n\n-- Separate query for eager-loading recent comments (simplified, Rails handles the WHERE IN)\nSELECT comments.*, users.username AS commenter_username FROM comments\nINNER JOIN users ON users.id = comments.user_id\nWHERE comments.post_id IN (1, 2, ..., 10) -- IDs of the 10 posts from first query\nORDER BY comments.created_at DESC\nLIMIT 3; -- LIMIT 3 PER POST is complex to do in a single query without window functions\n```\n\n**Note on `LIMIT 3` for comments:** Retrieving the 'first 3 recent commenters' *per post* in a single, highly optimized query with standard `includes` or `eager_load` is challenging for Rails without leveraging database-specific window functions (e.g., `ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY created_at DESC)`). A common Rails pattern for this is to use a `has_many` association with a `limit` and `order` scope, and then allow `includes` or `eager_load` to handle it, which will likely result in a separate query for the comments, but it will be a single query for all posts' comments (e.g., `WHERE post_id IN (...)`). A truly single-query approach would involve AREL and `LATERAL JOIN` or window functions for PostgreSQL/MySQL.\n\nFor a senior dev, recognizing the complexity of 'limit N per group' and suggesting a performant compromise (like a second query for comments) or proposing database-specific solutions is key.",
    "codeExample": "class User < ApplicationRecord\n  has_many :posts\n  has_many :comments\nend\n\nclass Post < ApplicationRecord\n  belongs_to :user\n  has_many :comments\n  # Custom association for eager-loading limited comments\n  has_many :recent_comments, -> { order(created_at: :desc).limit(3) }, class_name: 'Comment'\nend\n\nclass Comment < ApplicationRecord\n  belongs_to :user\n  belongs_to :post\nend\n\n# The final query solution\ndashboard_posts = Post.includes(:user) # Eager load post authors\n                       .left_joins(:comments) # Join comments to count them\n                       .select(\n                         'posts.*',\n                         'users.username AS author_username',\n                         'COUNT(comments.id) AS comments_count'\n                       )\n                       .group('posts.id', 'users.username')\n                       .order(created_at: :desc)\n                       .limit(10)\n                       .eager_load(recent_comments: :user) # Eager load recent comments and their authors\n\n# Displaying the data\ndashboard_posts.each do |post|\n  puts \"Title: #{post.title}\"\n  puts \"Content: #{post.content.truncate(100)}\"\n  puts \"Author: #{post.user.username}\" # .user is eager loaded\n  puts \"Comments Count: #{post.comments_count}\" # From COUNT aggregate\n  puts \"Recent Commenters:\"\n  post.recent_comments.each do |comment|\n    puts \"  - #{comment.user.username}: #{comment.content.truncate(50)}\" # .user on comment is eager loaded\n  end\n  puts \"---\"\nend",
    "hasSubQuestions": true,
    "subQuestions": [
      {
        "id": 2201,
        "question": "Initially, if you just did `Post.all.limit(10)`, and then in your view iterated through `@posts.each { |post| puts post.user.username; puts post.comments.count }`, what performance problem would arise and why?",
        "correctAnswer": "This scenario would immediately lead to an **N+1 query problem**.\n-   **N+1 for Authors:** `Post.all.limit(10)` would perform 1 query to fetch 10 posts.\n-   Then, for each of the 10 posts, `post.user.username` would trigger a separate `SELECT` query to fetch the associated `User` (10 queries). So, 1 (posts) + 10 (users) = 11 queries.\n-   **N+1 for Comment Counts:** Similarly, `post.comments.count` would trigger another separate `SELECT COUNT(*)` query for each of the 10 posts (another 10 queries). So, 11 + 10 = 21 queries in total.\nThis leads to significantly degraded performance as the number of posts grows.",
        "codeExample": "# app/controllers/posts_controller.rb\nclass PostsController < ApplicationController\n  def dashboard\n    @posts = Post.all.limit(10) # 1 query\n  end\nend\n\n# app/views/posts/dashboard.html.erb\n<% @posts.each do |post| %>\n  <p>Title: <%= post.title %></p>\n  <p>Author: <%= post.user.username %></p>  \n  <p>Comments: <%= post.comments.count %></p> \n<% end %>"
      },
      {
        "id": 2202,
        "question": "How would you modify the query to efficiently fetch the post's author and the total comment count for each of the 10 posts, avoiding N+1 queries for these specific pieces of data?",
        "correctAnswer": "To fetch the author and comment count efficiently, you'd use `includes` for the user and `left_joins` with `select` and `group` for the comment count:\n\n```ruby\nPost.includes(:user) # Eager load the author\n    .left_joins(:comments) # Join comments to perform aggregate count\n    .select(\n      'posts.*',\n      'users.username AS author_username',\n      'COUNT(comments.id) AS comments_count' # Aggregate the count\n    )\n    .group('posts.id', 'users.username') # Group by posts.id and users.username for the COUNT\n    .order(created_at: :desc)\n    .limit(10)\n```\n\n**Explanation:**\n-   `includes(:user)`: Eager loads the `User` association, preventing N+1 for `post.user`.\n-   `left_joins(:comments)`: Uses a `LEFT OUTER JOIN` to include comments. `LEFT` is important so posts without comments are still returned.\n-   `select('posts.*', 'users.username AS author_username', 'COUNT(comments.id) AS comments_count')`: Selects all post columns, the user's username (aliased for clarity), and the aggregated count of comments.\n-   `group('posts.id', 'users.username')`: Necessary because of the `COUNT` aggregate function. All selected columns that are *not* aggregates must be in the `GROUP BY` clause.",
        "codeExample": "class Post < ApplicationRecord\n  belongs_to :user\n  has_many :comments\nend\n\n# The modified query:\ndashboard_posts = Post.includes(:user)\n                       .left_joins(:comments)\n                       .select(\n                         'posts.*',\n                         'users.username AS author_username',\n                         'COUNT(comments.id) AS comments_count'\n                       )\n                       .group('posts.id', 'users.username')\n                       .order(created_at: :desc)\n                       .limit(10)\n\n# Usage:\ndashboard_posts.each do |post|\n  puts \"Title: #{post.title}\"\n  puts \"Author: #{post.user.username}\" # No N+1\n  puts \"Comments: #{post.comments_count}\" # No N+1\nend"
      },
      {
        "id": 2203,
        "question": "The most challenging part is fetching the usernames of the first 3 recent commenters *for each post*. How would you extend your query or strategy to efficiently achieve this, discussing any limitations of standard Active Record for this specific requirement?",
        "correctAnswer": "Fetching a 'limit N per group' (e.g., 3 comments *per post*) is notoriously difficult to do in a single, simple Active Record query without leveraging database-specific features. Standard `includes` or `eager_load` would fetch *all* comments for the 10 posts and then apply the limit in Ruby, or simply apply the limit to the overall comment set, not per post. \n\n**Strategy (Best Active Record Idiom):**\n1.  **Define a Custom `has_many` Association with Scope:** Create a new association on `Post` that includes the `order` and `limit` for comments. \n2.  **Eager Load this Custom Association:** Use `eager_load` or `includes` with this new association and its associated `user`.\n\n```ruby\n# In Post model:\nclass Post < ApplicationRecord\n  # ... existing associations ...\n  has_many :recent_comments, -> { order(created_at: :desc).limit(3) }, class_name: 'Comment'\nend\n\n# Modified query:\ndashboard_posts = Post.includes(:user)\n                       .left_joins(:comments)\n                       .select(\n                         'posts.*',\n                         'users.username AS author_username',\n                         'COUNT(comments.id) AS comments_count'\n                       )\n                       .group('posts.id', 'users.username')\n                       .order(created_at: :desc)\n                       .limit(10)\n                       .eager_load(recent_comments: :user) # Eager load the limited comments and their authors\n```\n\n**Limitations of Standard Active Record:**\n-   A single `LEFT JOIN` for `comments` combined with `GROUP BY` and `LIMIT` is problematic for 'limit N per group'. The `LIMIT` would apply to the overall joined result set, not individually per post group.\n-   `includes` or `eager_load` on a standard `has_many` would load *all* comments, then the Ruby code would pick the top 3, defeating the purpose for large comment counts.\n\n**Advanced Database-Specific Solutions (if Active Record is insufficient):**\nFor truly optimal performance in a single query, one would typically use:\n-   **PostgreSQL:** `LATERAL JOIN` or window functions (`ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY created_at DESC)`) combined with a subquery.\n-   **MySQL:** Subqueries or `LEFT JOIN` with tricks (e.g., `GROUP_CONCAT` for usernames, or using variables for row numbering in older MySQL versions).\n\nA senior developer should be aware of these database-specific solutions and when to consider dropping to AREL or raw SQL for such complex requirements if Active Record's built-in tools prove too inefficient.",
        "codeExample": "class Post < ApplicationRecord\n  # ... existing code ...\n  has_many :recent_comments, -> { order(created_at: :desc).limit(3) }, class_name: 'Comment'\nend\n\n# The full query (as in the main answer)\ndashboard_posts = Post.includes(:user)\n                       .left_joins(:comments)\n                       .select(\n                         'posts.*',\n                         'users.username AS author_username',\n                         'COUNT(comments.id) AS comments_count'\n                       )\n                       .group('posts.id', 'users.username')\n                       .order(created_at: :desc)\n                       .limit(10)\n                       .eager_load(recent_comments: :user)\n\n# In view or service:\n# post.recent_comments.each do |comment|\n#   puts comment.user.username # .user is eager loaded thanks to eager_load(recent_comments: :user)\n# end"
      }
    ]
  },
  {
    "id": 28,
    "category": "Active Record / Performance",
    "level": "senior",
    "title": "Eager Loading Methods Comparison",
    "question": "Differentiate between the Active Record eager loading methods `includes`, `preload`, and `joins`. Describe the fundamental mechanism (e.g., SQL clause, number of queries) for each, and identify the primary use case where each method is most appropriate.",
    "correctAnswer": "The primary difference lies in their **mechanism** and **purpose**:\n\n1.  **`includes` (Mechanism: Intelligent Eager Loading):** Active Record decides whether to use a single `LEFT OUTER JOIN` or two separate `SELECT` queries (`preload` strategy). It uses a join if it detects a condition (like `where` or `order`) that relies on the associated table; otherwise, it uses separate queries. **Purpose:** The most common way to resolve the N+1 query problem by guaranteeing the associated objects are loaded while allowing flexibility in query generation. Best for general eager loading.\n2.  **`preload` (Mechanism: Separate Queries):** Always executes a separate `SELECT` query for the associated records. For $N$ parent records, it's typically $1$ query for the parents and $1$ query for the association. **Purpose:** Eager loading without using a `JOIN`. It is ideal when you need to avoid the potential performance penalty of a large intermediate result set created by a `LEFT OUTER JOIN` or when querying through a `has_many :through` association. Best for avoiding joins.\n3.  **`joins` (Mechanism: `INNER JOIN`):** Adds an `INNER JOIN` to the SQL query. **Purpose:** It is primarily used for **filtering** the parent records based on conditions in the associated table (e.g., find all Authors who have books published in 2024). **Crucially, `joins` does not eagerly load the association.** If you access the association later, it will still trigger an N+1 query. Best for filtering or ordering on associations without needing to access them.",
    "codeExample": "# Author with books published in 2024\nAuthor.joins(:books).where(books: { published_year: 2024 })\n\n# Eagerly load books for all authors\nAuthor.includes(:books).all\n\n# Force preload (separate queries) to load books\nAuthor.preload(:books).all\n\n# N+1 still occurs with joins:\nauthors = Author.joins(:books).limit(10)\nauthors.each { |a| a.books.first.title } # N+1 queries here, association not loaded by joins",
    "scoringCriteria": {
      "0": "No response or confuses all three methods",
      "25": "Knows includes exists but cannot differentiate from others",
      "50": "Can explain includes and joins but misses preload",
      "75": "Explains all three with SQL mechanisms (JOIN types, queries)",
      "100": "Full explanation: mechanisms, use cases, when includes uses JOIN vs separate queries"
    }
  },
  {
    "id": 33,
    "category": "Memory Management / Performance",
    "level": "senior",
    "title": "Ruby Garbage Collection",
    "question": "How does garbage collection work in Ruby?",
    "correctAnswer": "Ruby (specifically MRI—Matz's Ruby Interpreter) primarily uses a **Generational Mark-and-Sweep** garbage collector (GC). The process is:\n\n1.  **Mark (Tracing):** The GC starts from \"root\" objects (objects in use, like global variables, local variables, and the stack) and recursively **marks** every object reachable from these roots as \"live.\"\n2.  **Sweep (Deallocation):** The GC iterates through all unmarked objects (those that are no longer reachable/referenced) and **frees** the memory they occupy.\n\nRuby's GC is **generational**, meaning objects are tracked in different \"generations\" (young, middle, old). Newer objects are checked more frequently than older objects, which are presumed to be long-lived. This speeds up the process significantly because most objects are short-lived. Ruby 2.1 introduced **Incremental GC** (running the GC in small, manageable steps) and **Lazy Sweep** (deferring the sweep phase), further reducing the stop-the-world pauses that historically hurt performance. Ruby 3.2 introduced **YJIT** (a just-in-time compiler) which works with the existing GC to improve performance, and **Pinning** to improve object relocation. \n",
    "codeExample": "# The GC runs automatically, but you can manually trigger it (not generally recommended)\nGC.start\n\n# Check the GC status (returns a hash of internal metrics)\nputs GC.stat.to_json\n\n# Disabling/Enabling the GC\nGC.disable\n# Code that needs minimal interruption...\nGC.enable\n",
    "scoringCriteria": {
      "0": "No response or unfamiliar with garbage collection",
      "25": "Knows GC exists but cannot explain mechanism",
      "50": "Can explain mark-and-sweep at basic level",
      "75": "Explains generational GC and mark-sweep phases",
      "100": "Full explanation: generational, incremental, lazy sweep, GC.stat"
    }
  },
  {
    "id": 35,
    "category": "Metaprogramming",
    "level": "senior",
    "title": "Singleton Class and Methods",
    "question": "What is the **singleton class** (also known as the eigenclass) in Ruby? Explain its purpose, and how it relates to defining **singleton methods** (or class methods) on an object.",
    "correctAnswer": "The **singleton class** is an anonymous class that Ruby automatically creates for **every object** when a singleton method is first defined on that object. Its purpose is to hold the object's singleton methods (methods unique to that single instance). The singleton class sits directly in the object's ancestor chain, before its actual class. When a message is sent to an object, Ruby searches the object's methods, then its singleton class methods, then its actual class, and so on up the inheritance chain. \n\n**Singleton methods** are instance methods defined specifically on the singleton class of a single object, ensuring they are only available to that object. For a class object (`MyClass`), its singleton methods are essentially its **class methods** (e.g., `MyClass.find`).",
    "codeExample": "class MyClass; end\nobj = MyClass.new\n\n# Define a singleton method on 'obj'\ndef obj.special_method\n  'Only on this object'\nend\n\n# Accessing the singleton class of obj\nputs obj.singleton_class # => #<Class:#<MyClass:0x...>>\n\n# Class methods are singleton methods on the Class object\nclass MyClass\n  class << self\n    def class_method\n      'Class level'\n    end\n  end\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with singleton class concept",
      "25": "Heard of eigenclass but cannot explain its purpose",
      "50": "Understands singleton methods but not the underlying class",
      "75": "Explains singleton class purpose and method lookup chain",
      "100": "Full explanation: eigenclass creation, class << self syntax, class methods as singleton methods"
    }
  },
  {
    "id": 36,
    "category": "Metaprogramming",
    "level": "senior",
    "title": "Method Missing and Dynamic Dispatch",
    "question": "Explain the role of the `method_missing` method in Ruby. Describe how it enables **dynamic dispatch** and list the necessary helper method that should always be overridden alongside it.",
    "correctAnswer": "The `method_missing` method is part of Ruby's **dynamic dispatch** mechanism. When an object receives a message (method call) for which it has no defined instance method (in its class or ancestor chain), Ruby intercepts the call and executes `method_missing`. This method receives the name of the missing method, the arguments, and an optional block.\n\n**Purpose:** It allows developers to handle undefined methods dynamically, enabling features like DSLs (Domain Specific Languages), proxy objects, and dynamic attribute accessors (e.g., Active Record's dynamic finders).\n\nThe essential helper method to override alongside `method_missing` is **`respond_to_missing?`**. This ensures that introspection methods like `respond_to?` and `methods` correctly report that the object *can* respond to the dynamically handled method, which is critical for good programming practice and avoiding bugs in external libraries.",
    "codeExample": "class DynamicAttributes\n  def method_missing(method_name, *args)\n    if method_name.to_s.start_with?('find_by_')\n      puts \"Dynamically finding record by #{method_name}\"\n    else\n      super\n    end\n  end\n\n  def respond_to_missing?(method_name, include_private = false)\n    method_name.to_s.start_with?('find_by_') || super\n  end\nend\n\nd = DynamicAttributes.new\nd.find_by_email # => Dynamically finding record by find_by_email\nputs d.respond_to?(:find_by_name) # => true",
    "scoringCriteria": {
      "0": "No response or unfamiliar with method_missing",
      "25": "Knows method_missing exists but cannot explain mechanism",
      "50": "Can explain method_missing but forgets respond_to_missing?",
      "75": "Explains both methods and their relationship",
      "100": "Full explanation: dispatch mechanism, DSL use cases, respond_to_missing? importance"
    }
  },
  {
    "id": 38,
    "category": "OOP Concepts",
    "level": "senior",
    "title": "The Role of `super`",
    "question": "What is the `super` keyword used for in Ruby? Describe the difference between calling `super` with parentheses and calling `super` without parentheses, and explain which one is generally considered safer.",
    "correctAnswer": "The `super` keyword is used within a method definition in a subclass to call the method of the **same name** in the **immediate superclass**.\n\n* **`super()` (With Parentheses):** Calls the superclass method **without any arguments**, regardless of what arguments the current method received. \n* **`super` (Without Parentheses):** Calls the superclass method, automatically passing **all arguments** received by the current method. If the current method was called with a block, the block is also implicitly passed to the superclass method.\n\nCalling **`super` without parentheses** is generally considered **safer** (especially in initialization/constructor methods) because it dynamically matches the argument list. If the superclass's method signature changes, the subclass method using `super` may not need updating, whereas `super()` would fail if the superclass started requiring arguments.",
    "codeExample": "class Parent\n  def initialize(name, age:)\n    @name = name\n    @age = age\n  end\nend\n\nclass Child < Parent\n  # The safest way to chain constructors\n  def initialize(name, age:, specialty)\n    super # Automatically passes name and age: to Parent#initialize\n    @specialty = specialty\n  end\n\n  def report\n    puts \"Name: #{@name}, Age: #{@age}, Specialty: #{@specialty}\"\n  end\nend\n\nChild.new(\"Alice\", age: 5, specialty: \"Painting\").report",
    "scoringCriteria": {
      "0": "No response or unfamiliar with super keyword",
      "25": "Knows super calls parent method but confused on syntax",
      "50": "Explains basic super usage but misses parentheses difference",
      "75": "Correctly explains super() vs super argument passing",
      "100": "Full explanation: argument forwarding, block passing, safety considerations"
    }
  },
  {
    "id": 39,
    "category": "Rails Core",
    "level": "senior",
    "title": "Rails Request Lifecycle",
    "question": "How would you explain Rails’ request lifecycle — from the request hitting the server until the response is returned?",
    "correctAnswer": "The lifecycle begins when the request enters **Rack**, passing through the **middleware stack** (for logging, sessions, security, etc.). Then, **ActionDispatch::Routing** selects the appropriate **Controller** and action. The controller executes `before_actions`, performs its core logic, interacts with **Active Record** (DB), and prepares data. Finally, **ActionView** renders the template (e.g., ERB). The response object is built and travels back down the middleware stack to **Rack** and is returned to the web server.",
    "codeExample": "# config/routes.rb determines the controller/action\n\n# The entry point of the application into Rails\n# Rack::Builder.new do\n#   use Rack::Attack # Example middleware\n#   run Rails.application\n# end.to_app\n\n# Controller execution flow\nclass PostsController < ApplicationController\n  # 1. Before action\n  before_action :authenticate\n\n  def index\n    # 2. Active Record Query\n    @posts = Post.all\n    # 3. View is rendered (e.g., app/views/posts/index.html.erb)\n  end\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with request lifecycle",
      "25": "Mentions controller but misses middleware/Rack",
      "50": "Explains basic controller-view flow",
      "75": "Includes Rack, middleware, routing, controller, view",
      "100": "Full lifecycle: Rack entry, middleware stack, routing, controller callbacks, AR, view rendering"
    }
  },
  {
    "id": 41,
    "category": "Debugging",
    "level": "senior",
    "title": "Debugging Intermittent 500s",
    "question": "How would you debug an intermittent 500 error occurring in production only?",
    "correctAnswer": "This typically points to a **race condition**, **environmental difference**, or **timeout**. The first step is to check **structured logging** systems (like Splunk/ELK stack) for the specific **request ID** where the error occurred to gather the stack trace, params, and timing. Utilize **Application Performance Monitoring (APM)** tools (e.g., New Relic, Sentry, Rollbar) to trace the exact line of failure. If needed, **add temporary instrumentation** (extra logging, metrics) to the suspected code path. Also, check for **background job failures** or **database slow queries/deadlocks** that might be causing timeouts. The goal is to isolate the specific conditions that trigger the failure.",
    "codeExample": "# Example of temporary instrumentation\nclass IntermittentController < ApplicationController\n  def unstable_action\n    Rails.logger.info(\"[DEBUG] Starting critical section with user #{current_user.id}\")\n    \n    # Suspect code block\n    result = ExternalService.call(params[:data])\n    \n    # Additional logging upon success/failure\n    Rails.logger.info(\"[DEBUG] External service status: #{result.status}\")\n    \n    # ... rest of the logic\n  rescue => e\n    Rollbar.error(e, request_params: params) \n    # Re-raise or handle the 500\n    raise\n  end\nend",
    "scoringCriteria": {
      "0": "No response or no debugging strategy",
      "25": "Mentions checking logs but no systematic approach",
      "50": "Uses logs and suggests possible causes",
      "75": "Structured approach: APM, logs, request ID tracing",
      "100": "Full strategy: APM tools, structured logging, instrumentation, race condition awareness"
    }
  },
  {
    "id": 43,
    "category": "Active Record / Performance",
    "level": "senior",
    "title": "Slow SQL Query Optimization",
    "question": "Suppose you have a slow SQL query in production. Walk me through how you would: 1. Find the root cause 2. Optimize it 3. Verify improvement",
    "correctAnswer": "**1. Find Root Cause:** Use **APM tools** (New Relic, Datadog) to pinpoint the slowest queries. Copy the slow SQL and run it with **`EXPLAIN ANALYZE`** in the database console (PostgreSQL or MySQL) to inspect the query plan, looking for full table scans, poor join order, or inefficient index usage. Also check application logs for **N+1 queries** in the surrounding code. **2. Optimize It:** The primary fix is adding **missing indexes** (especially on foreign keys and columns used in `WHERE`, `ORDER BY`, and `JOIN` clauses). Other options include: removing N+1s via eager loading, refactoring complex calculations to simpler SQL or using stored procedures, and potentially using **materialized views** or **database caching** for static, report-like data. **3. Verify Improvement:** After deployment, monitor the query time using the APM tools to ensure the execution time has decreased. Rerun `EXPLAIN ANALYZE` in staging/production to confirm the query plan is now utilizing the new index or optimization.",
    "codeExample": "-- Slow Query Diagnosis\nEXPLAIN ANALYZE SELECT * FROM users \nWHERE created_at < '2024-01-01' ORDER BY last_login DESC;\n\n-- Optimization (adding a compound index)\nCREATE INDEX index_users_on_created_at_and_last_login \nON users (created_at, last_login);\n\n-- Example of N+1 fix\n# Before: User.all.each { |u| u.posts.count } \n# After:\nUser.includes(:posts).each { |u| u.posts.count }",
    "scoringCriteria": {
      "0": "No response or no optimization strategy",
      "25": "Mentions checking query but no systematic approach",
      "50": "Suggests adding indexes without diagnosis step",
      "75": "Full process: EXPLAIN ANALYZE, indexing, verification",
      "100": "Complete approach: APM diagnosis, EXPLAIN ANALYZE, indexes, N+1 fix, monitoring verification"
    }
  },
  {
    "id": 44,
    "category": "Rails Legacy / Technical Debt",
    "level": "senior",
    "title": "Evaluating a Rails Monolith",
    "question": "Imagine joining a Rails 5 monolith with a lot of technical debt and untested code. What’s the first thing you evaluate?",
    "correctAnswer": "The first priority is to gain **safety and visibility**. I would start by **mapping the critical, high-risk code paths** (e.g., payment processing, user authentication, core business logic controllers, and production-facing background jobs). Then, I would implement **monitoring, logging, and APM** (if not already present) to track current performance and error rates. Before touching any debt-ridden code, I would **write characterization tests** (high-level feature/system tests) around these critical areas to **lock in the existing behavior**, however flawed, ensuring that future refactoring doesn't silently introduce regressions.",
    "codeExample": "# High-level request spec (Characterization Test)\nRSpec.describe 'Checkout Flow', type: :request do\n  it 'successfully completes a purchase with a valid card' do\n    # Lock down the current critical path behavior\n    post '/checkout', params: { order: attributes_for(:order) }\n    expect(response).to have_http_status(:success)\n    expect(Order.last.status).to eq('completed')\n  end\nend\n\n# Adding logging and monitoring points\nRails.logger.info(\"[CRITICAL] Starting legacy calculation for Order #{order.id}\")\nMetrics.increment('legacy_calc.started')",
    "scoringCriteria": {
      "0": "No response or would start refactoring immediately",
      "25": "Mentions code review but no safety measures",
      "50": "Suggests adding tests but no prioritization",
      "75": "Maps critical paths, adds monitoring, characterization tests",
      "100": "Full strategy: critical path mapping, APM setup, characterization tests, safety-first approach"
    }
  },
  {
    "id": 45,
    "category": "Rails Legacy / Architecture",
    "level": "senior",
    "title": "Safe Introduction of Functionality",
    "question": "How do you introduce new functionality safely into a large application without breaking existing behavior?",
    "correctAnswer": "The process is driven by minimizing risk and enabling rapid rollback. **1. Small Changes:** Break the feature down into the smallest possible incremental commits/PRs. **2. Testing:** Ensure comprehensive tests are written *before* or *concurrently* with the implementation, focusing on the new feature and writing characterization tests around any affected legacy areas. **3. Feature Flags:** Use a **feature flagging system** (e.g., Flipper, LaunchDarkly) to deploy the code to production disabled by default. This allows the new code to be tested in production by internal users or small segments, and instantly disabled (a 'kill switch') if issues arise, without requiring a full rollback. **4. Monitoring:** Validate performance and error rates using APM tools when the flag is live.",
    "codeExample": "# Using a simple feature flag helper\nclass NewFeatureController < ApplicationController\n  def index\n    if Feature.enabled?(:new_product_page)\n      render :new_product_page\n    else\n      render :old_product_page\n    end\n  end\n\n  # Example of safe method introduction using feature flags\n  def calculate_tax\n    if Feature.enabled?(:new_tax_engine)\n      NewTaxEngine.calculate(self)\n    else\n      super # Calls the legacy method\n    end\n  end\nend",
    "scoringCriteria": {
      "0": "No response or would deploy directly without safety measures",
      "25": "Mentions testing but no incremental approach",
      "50": "Suggests small PRs and testing",
      "75": "Includes feature flags, testing, and monitoring",
      "100": "Full approach: incremental commits, feature flags, characterization tests, APM monitoring"
    }
  },
  {
    "id": 46,
    "category": "Rails Modernization",
    "level": "senior",
    "title": "Rails Version Upgrade Blockers",
    "question": "If you needed to upgrade a Rails 5 app to 6 or 7, what blockers would you expect?",
    "correctAnswer": "Major Rails upgrades often involve fundamental shifts in tooling and defaults: \n\n* **Ruby Version:** Ensuring the application's Ruby version is compatible with the target Rails version. \n* **Autoloading:** The shift from the **Classic autoloader** to the **Zeitwerk autoloader** requires all file names and directory structures to strictly match their constant names, often breaking existing conventions in older monoliths. \n* **Frontend/Assets:** The change from **Turbolinks to Turbo** (Hotwire stack) and potential shifts in the Asset Pipeline. \n* **Security Defaults:** Changes in handling of **strong parameters**, default **Content Security Policy (CSP)**, and handling of external URLs. \n* **Deprecated Gems:** Ensuring all third-party gems (especially monkey-patched ones) have versions compatible with the new Rails/Ruby release. A **stable, comprehensive test suite** is the biggest prerequisite, as it identifies breaking changes immediately.",
    "codeExample": "# Zeitwerk Configuration (in config/application.rb)\n# Needs to be set to true for Rails 6+ defaults\n# If using an old structure, this can cause ConstantNotFound errors.\nconfig.load_defaults 6.0\n\n# Example of a parameter change (Rails 7+ handling of encrypted secrets)\n# Old: Rails.application.secrets.api_key\n# New:\nRails.application.credentials.api_key",
    "scoringCriteria": {
      "0": "No response or unfamiliar with upgrade challenges",
      "25": "Mentions gem compatibility only",
      "50": "Lists some blockers but misses key ones",
      "75": "Identifies Zeitwerk, gem compatibility, Ruby version",
      "100": "Full list: Zeitwerk, Ruby version, Turbo, credentials, gem compatibility, test suite importance"
    }
  },
  {
    "id": 47,
    "category": "Coding Challenge / Design",
    "level": "senior",
    "title": "Order Logic in Rails",
    "question": "**Follow up:** How would the `Order` calculation logic look inside a Rails model? When would you move this into a service object / PORO? How would you test this? How would you handle this logic if prices came from an external API that sometimes fails?",
    "correctAnswer": "**1. Rails Model:** The logic would live in methods on the `Order` model, likely using persistence (e.g., `has_many :order_items`). Calculations like `total` and `formatted_total` would be standard instance methods. A **Service Object / PORO** (Plain Old Ruby Object) is appropriate if the calculation logic becomes complex (e.g., involving multiple external APIs, complex tax rules, or chaining multiple discount types), or if the logic needs to be reused outside the primary Rails request flow (e.g., in a background job or a scheduled task). **2. Testing:** The model/service logic would be tested with **Unit Tests** (RSpec/Minitest) by instantiating the class, adding items, and asserting the output of `total` and `formatted_total` against known inputs/expected outputs (e.g., test cases for `total <= 100` and `total > 100`). **3. External Price Handling:** Extract the price lookup into a dedicated service (e.g., `PriceLookupService`). Use **caching/memoization** (Redis or in-memory) to prevent repeated external calls. Implement **error handling** (e.g., retries with backoff, circuit breaker pattern) in the service, and use **dependency injection** (pass the service object as an argument) so the external API can be easily stubbed in tests.",
    "codeExample": "# Order Model in Rails (using Active Record attributes)\nclass Order < ApplicationRecord\n  has_many :order_items\n  \n  def calculate_total\n    original_sum = order_items.sum(&:price)\n    original_sum > 100 ? (original_sum * 0.9).round(2) : original_sum.round(2)\n  end\n\n  # Example of moving complex logic to a Service Object\n  def apply_discounts(calculator: DiscountCalculator.new)\n    calculator.calculate(self)\n  end\nend\n\n# External Price Service with Caching and Stubbing Capability\nclass PriceLookupService\n  def self.price_for(sku)\n    # Logic: Check cache -> If miss, call ExternalApi.fetch(sku)\n    # Add retry logic and error handling here\n  end\nend",
    "scoringCriteria": {
      "0": "No response or only puts logic in controller",
      "25": "Knows model has logic but unclear on service objects",
      "50": "Can implement in model, mentions testing",
      "75": "Explains model vs service object, testing, and error handling",
      "100": "Full answer: model methods, service object criteria, unit testing, caching, circuit breaker for external APIs"
    }
  },
  {
    "id": 49,
    "category": "Background Jobs",
    "level": "senior",
    "title": "Handling Failed Worker Retries",
    "question": "What happens if a worker keeps retrying and failing — how do you detect and resolve this?",
    "correctAnswer": "If a worker keeps failing, it usually means the job is **not idempotent** or the error is **systemic** (e.g., bad data or an always-down external service). The job will typically exhaust its configured retry attempts (default in Sidekiq is 25), after which it is moved to the **Dead Job Queue (DLQ)**. **Detection:** Implement **alerting** (via APM or Rollbar/Sentry) on worker exceptions and monitor the job retry count/DLQ size. **Resolution:** **1. Fix Logic:** Inspect the job in the DLQ. If the failure is due to bad input, fix the data and manually retry the job. **2. Ensure Idempotency:** Modify the worker logic to ensure it can be safely rerun multiple times without negative side effects (e.g., check if a record already exists before creating it). **3. Defensive Coding:** Implement more robust error catching, retries with exponential backoff, and use a **Circuit Breaker pattern** for external services to temporarily stop retries when the dependency is failing.",
    "codeExample": "# Sidekiq Example: Limiting Retries and Ensuring Idempotency\nclass ExternalAPIJob < ApplicationJob\n  sidekiq_options retry: 5 # Custom retry limit\n  \n  def perform(record_id)\n    record = Record.find(record_id)\n    return if record.processed? # Idempotency check\n    \n    # External API call with error handling\n    ExternalAPI.send(record.data)\n    record.update!(status: :processed)\n    \n  rescue ExternalAPI::TimeoutError\n    # Let Sidekiq retry the job with exponential backoff\n    raise\n  end\nend",
    "scoringCriteria": {
      "0": "No response or unfamiliar with job retries",
      "25": "Knows jobs retry but no detection strategy",
      "50": "Mentions DLQ but incomplete resolution approach",
      "75": "Explains detection, DLQ, idempotency",
      "100": "Full approach: alerting, DLQ inspection, idempotency, circuit breaker, exponential backoff"
    }
  },
  {
    "id": 50,
    "category": "Performance / Maintenance",
    "level": "senior",
    "title": "Debugging Memory Leaks and Crashes",
    "question": "How have you debugged memory leaks or worker crashes?",
    "correctAnswer": "Memory leaks are characterized by **gradual, unbounded heap growth** over time, leading to crashes or excessive swapping. **Debugging Strategy:** **1. Monitoring:** Use **APM tools** (Datadog/New Relic) to visualize process memory usage. Look for worker or web processes whose memory continually increases after serving requests. **2. Isolation/Profiling:** Use memory profilers like **`Derailleur`** or Ruby's built-in **`objspace`** and **`GC.stat`** to take heap dumps and identify which objects (large hashes, arrays, or cached associations) are being created and never garbage collected. **3. Root Cause:** Leaks often stem from **unbounded caching** (e.g., storing too much data in a class variable or `Rails.cache` without a TTL) or using C extensions that incorrectly manage native memory. **4. Mitigation:** Implement a **periodic restart strategy** (e.g., using Kubernetes or systemd) to cap memory usage, though this only masks the problem; the code fix is essential.",
    "codeExample": "# Common Leak Source: Unbounded Class Cache\nclass LeakyCache\n  @@cache = {}\n  \n  def self.store(key, value)\n    @@cache[key] = value # This hash grows indefinitely\n  end\nend\n\n# Correcting with Rails.cache (TTL enforced)\nRails.cache.fetch(\"user:#{id}\", expires_in: 1.hour) do\n  # Fetch data here\nend\n\n# Example of using Ruby's profiler to check memory usage\nGC.start\nputs GC.stat[:heap_live_slots] # Check live object count",
    "scoringCriteria": {
      "0": "No response or no debugging experience",
      "25": "Mentions monitoring but no systematic approach",
      "50": "Suggests APM monitoring but unclear on profiling",
      "75": "Explains APM, heap dumps, common causes",
      "100": "Full approach: APM monitoring, memory profilers, GC.stat, unbounded cache patterns, mitigation"
    }
  },
  {
    "id": 52,
    "category": "Testing",
    "level": "senior",
    "title": "Introducing Tests in Legacy Code",
    "question": "How do you start introducing tests in a legacy codebase with almost no test coverage?",
    "correctAnswer": "The strategy is to prioritize safety over complete coverage: **1. Characterization Tests:** Start by writing high-level **Feature/System Tests** (using Capybara/RSpec request specs) around the most **business-critical, high-risk code paths** (e.g., payment, user creation, core reports). These tests treat the system like a black box, verifying that current, working functionality remains intact. **2. Unit Tests for New Code:** Enforce 100% unit test coverage for any **newly written code** or services, preventing the introduction of *new* debt. **3. Target Refactoring:** When you need to refactor a specific piece of debt, write targeted **Unit Tests** around that class first, then perform the refactoring. Only refactor the code that is **currently being worked on**, following the Boy Scout Rule (leave the codebase cleaner than you found it).",
    "codeExample": "# RSpec Request Spec (Characterization Test)\nRSpec.describe 'Authentication', type: :request do\n  it 'logs in a user with old hash passwords' do\n    # This test ensures the old, complex login logic doesn't break\n    post '/login', params: { user: { email: 'old@user.com', password: 'old_password' } }\n    expect(session[:user_id]).to be_present\n  end\nend\n\n# New PORO with dedicated unit tests\nclass NewOrderProcessor\n  # ... implementation\nend\n# spec/services/new_order_processor_spec.rb will cover all paths",
    "scoringCriteria": {
      "0": "No response or would try to test everything at once",
      "25": "Mentions adding tests but no prioritization",
      "50": "Suggests testing critical paths first",
      "75": "Explains characterization tests and critical path prioritization",
      "100": "Full strategy: characterization tests, 100% coverage for new code, Boy Scout Rule"
    }
  }
];
