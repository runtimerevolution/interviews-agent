export const questions = [
  {
    "id": 1,
    "category": "Basic Ruby",
    "level": "junior",
    "title": "Symbols vs Strings",
    "question": "What is the difference between a symbol and a string in Ruby?",
    "correctAnswer": "Symbols are immutable and reused in memory (stored once), while strings are mutable and create new objects each time. Symbols are typically used as identifiers or keys in hashes because they're more memory efficient.",
    "codeExample": "# String - creates new object each time\nname1 = \"John\"\nname2 = \"John\"\nname1.object_id == name2.object_id  # => false\n\n# Symbol - reuses same object\nstatus1 = :active\nstatus2 = :active\nstatus1.object_id == status2.object_id  # => true\n\n# Common usage in hashes\nuser = { name: \"John\", status: :active }\n# vs\nuser = { \"name\" => \"John\", \"status\" => \"active\" }",
    "image": "https://picsum.photos/id/1/800/400"
  },
  {
    "id": 2,
    "category": "Basic Ruby",
    "level": "junior",
    "title": "== vs equal?",
    "question": "Explain the difference between '==' and 'equal?' in Ruby.",
    "correctAnswer": "'==' checks for value equality (can be overridden), while 'equal?' checks for object identity (same object in memory). For example, two strings with the same content are == but not equal? unless they're the same object.",
    "codeExample": "a = \"hello\"\nb = \"hello\"\nc = a\n\n# Value equality (content comparison)\na == b        # => true\n\n# Object identity (same object in memory)\na.equal?(b)   # => false\na.equal?(c)   # => true\n\n# With numbers (integers are cached)\nx = 5\ny = 5\nx == y        # => true\nx.equal?(y)   # => true (small integers reuse same object)",
    "image": "https://picsum.photos/id/10/800/400"
  },
  {
    "id": 4,
    "category": "Rails Framework",
    "level": "junior",
    "title": "MVC Pattern",
    "question": "Explain the MVC pattern in Rails and how it works.",
    "correctAnswer": "MVC separates concerns: Model (data/business logic with Active Record), View (presentation layer with ERB/templates), and Controller (handles requests, coordinates model and view). Request flows: Route → Controller → Model → Controller → View → Response.",
    "codeExample": "# config/routes.rb\nRails.application.routes.draw do\n  resources :articles\nend\n\n# app/controllers/articles_controller.rb\nclass ArticlesController < ApplicationController\n  def index\n    @articles = Article.all  # Model\n  end                        # Renders view\nend\n\n# app/models/article.rb\nclass Article < ApplicationRecord\n  validates :title, presence: true\n\n  def summary\n    content.truncate(100)\n  end\nend\n\n# app/views/articles/index.html.erb\n<% @articles.each do |article| %>\n  <h2><%= article.title %></h2>\n  <p><%= article.summary %></p>\n<% end %>"
  },
  {
    "id": 5,
    "category": "Rails Framework",
    "level": "junior",
    "title": "Migrations",
    "question": "What is the purpose of Rails migrations and how do they work?",
    "correctAnswer": "Migrations are version control for databases. They allow you to modify database schema over time in a consistent way. Each migration is timestamped and can be rolled back. They're Ruby DSL that generates database-agnostic SQL, allowing team collaboration and deployment consistency.",
    "codeExample": "# Generate migration\nrails generate migration CreateArticles\n\n# db/migrate/20240120_create_articles.rb\nclass CreateArticles < ActiveRecord::Migration[7.0]\n  def change\n    create_table :articles do |t|\n      t.string :title, null: false\n      t.text :content\n      t.references :author, foreign_key: { to_table: :users }\n      t.timestamps\n    end\n\n    add_index :articles, :title\n  end\nend\n\n# Run migrations\nrails db:migrate\n\n# Rollback\nrails db:rollback\n\n# Check status\nrails db:migrate:status"
  },
  {
    "id": 8,
    "category": "Active Record",
    "level": "junior",
    "title": "Find Methods",
    "question": "Explain the difference between 'find', 'find_by', and 'where' in Active Record.",
    "correctAnswer": "'find' takes an ID and raises RecordNotFound if missing. 'find_by' takes conditions and returns first match or nil. 'where' returns an ActiveRecord::Relation (lazy loaded, chainable) matching all conditions. 'find' and 'find_by' execute immediately.",
    "codeExample": "# find - by ID, raises error if not found\nuser = User.find(1)\nUser.find(999)  # => ActiveRecord::RecordNotFound\n\n# find_by - returns first match or nil\nuser = User.find_by(email: 'john@example.com')\nUser.find_by(email: 'invalid@example.com')  # => nil\n\n# where - returns ActiveRecord::Relation (chainable)\nusers = User.where(status: 'active')  # Lazy loaded\nusers = users.where('age > ?', 18)    # Chainable\nusers.each { |u| puts u.name }        # Executes query\n\n# Multiple IDs with find\nusers = User.find([1, 2, 3])\n\n# find_by with multiple conditions\nuser = User.find_by(email: 'john@example.com', status: 'active')",
    "hasSubQuestions": true,
    "subQuestions": [
      {
        "id": 801,
        "question": "What does the 'find' method do and what happens when a record is not found?",
        "correctAnswer": "'find' searches by primary key (ID) and immediately executes the query. If the record is not found, it raises an ActiveRecord::RecordNotFound exception. You can pass a single ID or an array of IDs.",
        "codeExample": "# Find by ID\nuser = User.find(1)\n\n# Not found - raises exception\nUser.find(999)  # => ActiveRecord::RecordNotFound\n\n# Find multiple records\nusers = User.find([1, 2, 3])  # Returns array\n\n# Handle exception\nbegin\n  user = User.find(params[:id])\nrescue ActiveRecord::RecordNotFound\n  redirect_to root_path, alert: \"User not found\"\nend"
      },
      {
        "id": 802,
        "question": "How does 'find_by' differ from 'find' and what does it return when no record is found?",
        "correctAnswer": "'find_by' searches by any attribute(s), not just ID. It returns the first matching record or nil if nothing is found (doesn't raise an exception). It executes immediately and is not chainable.",
        "codeExample": "# Find by any attribute\nuser = User.find_by(email: 'john@example.com')\n\n# Returns nil if not found (no exception)\nuser = User.find_by(email: 'invalid@example.com')  # => nil\n\n# Multiple conditions\nuser = User.find_by(email: 'john@example.com', status: 'active')\n\n# Safe navigation\nuser = User.find_by(email: params[:email])\nif user\n  # user exists\nelse\n  # not found\nend\n\n# With bang! version (raises exception)\nuser = User.find_by!(email: 'john@example.com')  # Raises if not found"
      },
      {
        "id": 803,
        "question": "What is unique about 'where' method and why is it chainable?",
        "correctAnswer": "'where' returns an ActiveRecord::Relation object, which is lazy-loaded and chainable. The query doesn't execute until you iterate over it or call methods like 'to_a', 'count', 'first', etc. This allows building complex queries step by step.",
        "codeExample": "# Returns ActiveRecord::Relation (not executed yet)\nusers = User.where(status: 'active')\n\n# Chainable - builds the query\nusers = users.where('age > ?', 18)\nusers = users.order(created_at: :desc)\nusers = users.limit(10)\n\n# Query executes when needed\nusers.each { |u| puts u.name }  # NOW it executes\n\n# Can check if relation is loaded\nusers.loaded?  # => false (before iteration)\n\n# Other execution triggers\nusers.count     # Executes query\nusers.first     # Executes query\nusers.to_a      # Executes query\n\n# Combine with other relations\nactive_users = User.where(status: 'active')\npremium_active = active_users.where(plan: 'premium')  # Chainable!"
      }
    ]
  },
  {
    "id": 19,
    "category": "Security",
    "level": "junior",
    "title": "Strong Parameters",
    "question": "Explain strong parameters and why they're important.",
    "correctAnswer": "Strong parameters whitelist allowed parameters to prevent mass assignment vulnerabilities. Use 'require' and 'permit' methods in controllers. Without them, attackers could modify any model attribute. Example: params.require(:user).permit(:name, :email) ensures only name and email can be mass-assigned.",
    "codeExample": "# Controller\nclass UsersController < ApplicationController\n  def create\n    @user = User.new(user_params)\n    if @user.save\n      redirect_to @user\n    else\n      render :new\n    end\n  end\n\n  private\n\n  def user_params\n    # Only permit specific attributes\n    params.require(:user).permit(:name, :email, :bio)\n  end\nend\n\n# WITHOUT strong params (VULNERABLE)\n# If attacker sends: { user: { name: 'John', admin: true } }\n@user = User.new(params[:user])  # BAD! admin gets set\n\n# WITH strong params (SAFE)\n@user = User.new(user_params)  # admin is filtered out\n\n# Nested attributes\ndef article_params\n  params.require(:article).permit(\n    :title,\n    :content,\n    tag_ids: [],\n    author_attributes: [:name, :bio]\n  )\nend\n\n# Conditional permissions\ndef user_params\n  if current_user.admin?\n    params.require(:user).permit(:name, :email, :role)\n  else\n    params.require(:user).permit(:name, :email)\n  end\nend"
  },
  {
    "id": 3,
    "category": "Basic Ruby",
    "level": "mid",
    "title": "Blocks, Procs & Lambdas",
    "question": "What are blocks, procs, and lambdas in Ruby? How do they differ?",
    "correctAnswer": "Blocks are code chunks passed to methods. Procs are objects that hold blocks and can be stored in variables. Lambdas are special procs that check argument count and use 'return' to exit only the lambda (not the enclosing method). Lambdas are more strict about arguments.",
    "codeExample": "# Block - not an object, passed to method\n[1, 2, 3].each { |n| puts n }\n\n# Proc - object, doesn't check arguments\nmy_proc = Proc.new { |x| puts x }\nmy_proc.call(1)     # => 1\nmy_proc.call(1, 2)  # => 1 (ignores extra args)\n\n# Lambda - object, checks arguments\nmy_lambda = lambda { |x| puts x }\nmy_lambda.call(1)     # => 1\nmy_lambda.call(1, 2)  # => ArgumentError\n\n# Return behavior difference\ndef test_proc\n  my_proc = Proc.new { return \"proc\" }\n  my_proc.call\n  \"after proc\"  # never reached\nend\n\ndef test_lambda\n  my_lambda = lambda { return \"lambda\" }\n  my_lambda.call\n  \"after lambda\"  # this is reached\nend"
  },
  {
    "id": 6,
    "category": "Rails Framework",
    "level": "mid",
    "title": "Asset Pipeline",
    "question": "Explain the Rails asset pipeline and its purpose.",
    "correctAnswer": "The asset pipeline concatenates and minifies JavaScript and CSS assets. It adds fingerprinting for cache busting, compiles higher-level languages (Sass, CoffeeScript), and serves assets from app/assets, lib/assets, and vendor/assets. In production, it precompiles for performance.",
    "codeExample": "# app/assets/stylesheets/application.css\n/*\n *= require_tree .\n *= require_self\n */\n\n# app/assets/javascripts/application.js\n//= require rails-ujs\n//= require turbolinks\n//= require_tree .\n\n# In production (config/environments/production.rb)\nconfig.assets.compile = false\nconfig.assets.digest = true\n\n# Precompile assets\nrails assets:precompile\n\n# Result: fingerprinted files\n# application-a1b2c3d4.css\n# application-e5f6g7h8.js\n\n# In views\n<%= stylesheet_link_tag 'application' %>\n<%= javascript_include_tag 'application' %>"
  },
  {
    "id": 7,
    "category": "Active Record",
    "level": "mid",
    "title": "N+1 Query Problem",
    "question": "What is N+1 query problem and how do you solve it in Rails?",
    "correctAnswer": "N+1 occurs when you load a collection and then access associations for each item, causing N additional queries. Solve with eager loading using 'includes', 'preload', or 'eager_load'. Example: User.includes(:posts) instead of User.all.each { |u| u.posts }.",
    "codeExample": "# N+1 Problem (BAD)\nusers = User.all  # 1 query\nusers.each do |user|\n  puts user.posts.count  # N queries (one per user)\nend\n# Total: 1 + N queries\n\n# Solution 1: includes (smart loading)\nusers = User.includes(:posts)\nusers.each do |user|\n  puts user.posts.count  # No additional queries\nend\n# Total: 2 queries (users + posts)\n\n# Solution 2: preload (separate queries)\nusers = User.preload(:posts)\n\n# Solution 3: eager_load (LEFT JOIN)\nusers = User.eager_load(:posts)\n\n# With nested associations\nUser.includes(posts: [:comments, :tags])\n\n# Check queries in console\nUser.includes(:posts).to_sql",
    "image": "https://picsum.photos/id/20/800/400"
  },
  {
    "id": 9,
    "category": "Active Record",
    "level": "mid",
    "title": "Scopes",
    "question": "What are scopes in Active Record and why are they useful?",
    "correctAnswer": "Scopes are reusable query methods defined in models using 'scope' keyword or class methods. They return ActiveRecord::Relation objects and are chainable. Benefits: DRY code, readability, testability, and encapsulation of common queries. Example: scope :published, -> { where(published: true) }.",
    "codeExample": "# app/models/article.rb\nclass Article < ApplicationRecord\n  # Using scope\n  scope :published, -> { where(published: true) }\n  scope :recent, -> { order(created_at: :desc).limit(10) }\n  scope :by_author, ->(author_id) { where(author_id: author_id) }\n\n  # Using class method (equivalent)\n  def self.featured\n    where(featured: true).order(views: :desc)\n  end\n\n  # Conditional scope\n  scope :search, ->(term) {\n    where('title LIKE ?', \"%#{term}%\") if term.present?\n  }\nend\n\n# Usage - chainable\narticles = Article.published.recent\narticles = Article.published.by_author(5).recent\narticles = Article.featured.limit(5)\n\n# Default scope (use cautiously)\ndefault_scope { where(deleted_at: nil) }"
  },
  {
    "id": 10,
    "category": "Associations",
    "level": "mid",
    "title": "Through vs HABTM",
    "question": "Explain has_many :through vs has_and_belongs_to_many associations.",
    "correctAnswer": "has_and_belongs_to_many (HABTM) is simpler, requires no join model, just a join table. has_many :through uses a full join model, allowing additional attributes and validations on the relationship itself. Use :through when the relationship has its own data.",
    "codeExample": "# has_and_belongs_to_many (HABTM)\nclass User < ApplicationRecord\n  has_and_belongs_to_many :roles\nend\n\nclass Role < ApplicationRecord\n  has_and_belongs_to_many :users\nend\n\n# Requires: users_roles table (no id, no timestamps)\n# Migration:\ncreate_table :users_roles, id: false do |t|\n  t.belongs_to :user\n  t.belongs_to :role\nend\n\n# has_many :through\nclass User < ApplicationRecord\n  has_many :memberships\n  has_many :projects, through: :memberships\nend\n\nclass Membership < ApplicationRecord\n  belongs_to :user\n  belongs_to :project\n  # Can have additional fields\n  enum role: [:member, :admin, :owner]\n  validates :role, presence: true\nend\n\nclass Project < ApplicationRecord\n  has_many :memberships\n  has_many :users, through: :memberships\nend\n\n# Usage:\nuser.memberships.create(project: project, role: :admin)"
  },
  {
    "id": 12,
    "category": "Associations",
    "level": "mid",
    "title": "Dependent Options",
    "question": "Explain dependent: :destroy vs dependent: :delete_all.",
    "correctAnswer": "dependent: :destroy calls destroy on each associated record, triggering callbacks and validations. dependent: :delete_all uses a single SQL DELETE statement, bypassing callbacks/validations but much faster for bulk deletion. Use :destroy when callbacks matter, :delete_all for performance.",
    "codeExample": "# dependent: :destroy (callbacks run)\nclass User < ApplicationRecord\n  has_many :posts, dependent: :destroy\nend\n\nclass Post < ApplicationRecord\n  belongs_to :user\n  before_destroy :log_deletion\n  after_destroy :clear_cache\n\n  def log_deletion\n    Rails.logger.info \"Deleting post #{id}\"\n  end\nend\n\nuser.destroy  # Triggers callbacks on each post\n# SQL: DELETE FROM posts WHERE id = 1\n# SQL: DELETE FROM posts WHERE id = 2\n# ... (one query per post)\n\n# dependent: :delete_all (no callbacks)\nclass User < ApplicationRecord\n  has_many :posts, dependent: :delete_all\nend\n\nuser.destroy  # No callbacks, single query\n# SQL: DELETE FROM posts WHERE user_id = 1\n\n# Other options\ndependent: :nullify    # Sets foreign key to NULL\ndependent: :restrict_with_error  # Prevents deletion if has records"
  },
  {
    "id": 13,
    "category": "Modular Applications",
    "level": "mid",
    "title": "Concerns",
    "question": "What are concerns in Rails and how do you use them?",
    "correctAnswer": "Concerns are modules that extract reusable code from models/controllers using ActiveSupport::Concern. They can include both instance methods and class methods (using class_methods block), and included hooks. Stored in app/models/concerns or app/controllers/concerns for organization.",
    "codeExample": "# app/models/concerns/searchable.rb\nmodule Searchable\n  extend ActiveSupport::Concern\n\n  included do\n    scope :search, ->(query) {\n      where('name LIKE ?', \"%#{query}%\")\n    }\n  end\n\n  class_methods do\n    def find_by_query(query)\n      search(query).first\n    end\n  end\n\n  def highlighted_name(query)\n    name.gsub(query, \"<mark>#{query}</mark>\")\n  end\nend\n\n# app/models/article.rb\nclass Article < ApplicationRecord\n  include Searchable\nend\n\n# app/models/user.rb\nclass User < ApplicationRecord\n  include Searchable\nend\n\n# Usage\nArticle.search(\"rails\")\nUser.find_by_query(\"john\")\narticle.highlighted_name(\"Ruby\")"
  },
  {
    "id": 17,
    "category": "Security",
    "level": "mid",
    "title": "CSRF Protection",
    "question": "Explain CSRF protection in Rails and how it works.",
    "correctAnswer": "Rails includes a CSRF token in forms and AJAX requests. The token is stored in session and verified on POST/PUT/PATCH/DELETE requests. protect_from_forgery ensures tokens match. Prevents attackers from submitting forms on behalf of authenticated users. Enabled by default in ApplicationController.",
    "codeExample": "# app/controllers/application_controller.rb\nclass ApplicationController < ActionController::Base\n  protect_from_forgery with: :exception\n  # or with: :null_session (API mode)\nend\n\n# Forms automatically include token\n<%= form_with model: @article do |f| %>\n  <%= f.text_field :title %>\n  <%# Hidden field added automatically: %>\n  <%# <input type=\"hidden\" name=\"authenticity_token\" value=\"...\"> %>\n  <%= f.submit %>\n<% end %>\n\n# AJAX requests (with Rails UJS)\n$.ajax({\n  url: '/articles',\n  type: 'POST',\n  headers: {\n    'X-CSRF-Token': $('meta[name=\"csrf-token\"]').attr('content')\n  },\n  data: { article: { title: 'New Article' } }\n});\n\n# In layout (automatically added)\n<%= csrf_meta_tags %>\n<!-- Generates: -->\n<meta name=\"csrf-token\" content=\"token_value\">\n\n# Skip for specific actions (use cautiously)\nclass ApiController < ApplicationController\n  skip_before_action :verify_authenticity_token\nend"
  },
  {
    "id": 18,
    "category": "Security",
    "level": "mid",
    "title": "SQL Injection",
    "question": "What is SQL injection and how does Rails protect against it?",
    "correctAnswer": "SQL injection occurs when user input is directly interpolated into SQL queries. Rails protects by using parameterized queries with placeholders (?). Never use string interpolation in where clauses. Use where('name = ?', params[:name]) not where(\"name = '#{params[:name]}')\". Active Record sanitizes inputs.",
    "codeExample": "# VULNERABLE (BAD - SQL Injection)\nusername = params[:username]\nUser.where(\"username = '#{username}'\")\n# If username = \"admin' OR '1'='1\"\n# SQL: SELECT * FROM users WHERE username = 'admin' OR '1'='1'\n# Returns all users!\n\n# SAFE - Parameterized query\nUser.where(\"username = ?\", params[:username])\n# SQL: SELECT * FROM users WHERE username = 'admin'' OR ''1''=''1'\n# Properly escaped\n\n# SAFE - Hash conditions\nUser.where(username: params[:username])\n\n# SAFE - Named placeholders\nUser.where(\"username = :username AND age > :age\",\n  username: params[:username],\n  age: params[:age]\n)\n\n# VULNERABLE - Raw SQL\nUser.find_by_sql(\"SELECT * FROM users WHERE name = '#{params[:name]}'\")\n\n# SAFE - Raw SQL with bindings\nUser.find_by_sql([\"SELECT * FROM users WHERE name = ?\", params[:name]])\n\n# Sanitize helpers (when needed)\nUser.sanitize_sql([\"name = ?\", params[:name]])\nUser.sanitize_sql_like(params[:search_term])"
  },
  {
    "id": 11,
    "category": "Associations",
    "level": "senior",
    "title": "Polymorphic Associations",
    "question": "What is polymorphic association and when would you use it?",
    "correctAnswer": "Polymorphic associations allow a model to belong to multiple other models on a single association. Uses _type and _id columns. Example: Comment belongs_to :commentable, polymorphic: true could belong to Post or Article. Useful for shared behavior across different models.",
    "codeExample": "# app/models/comment.rb\nclass Comment < ApplicationRecord\n  belongs_to :commentable, polymorphic: true\n  validates :content, presence: true\nend\n\n# app/models/article.rb\nclass Article < ApplicationRecord\n  has_many :comments, as: :commentable, dependent: :destroy\nend\n\n# app/models/video.rb\nclass Video < ApplicationRecord\n  has_many :comments, as: :commentable, dependent: :destroy\nend\n\n# Migration\ncreate_table :comments do |t|\n  t.text :content\n  t.references :commentable, polymorphic: true\n  # Generates: commentable_id, commentable_type\n  t.timestamps\nend\n\n# Usage\narticle = Article.first\narticle.comments.create(content: \"Great post!\")\n\nvideo = Video.first\nvideo.comments.create(content: \"Nice video!\")\n\n# Query\ncomment = Comment.first\ncomment.commentable  # => Returns Article or Video\ncomment.commentable_type  # => \"Article\" or \"Video\""
  },
  {
    "id": 14,
    "category": "Modular Applications",
    "level": "senior",
    "title": "Service Objects",
    "question": "Explain service objects and when you should use them.",
    "correctAnswer": "Service objects are POROs (Plain Old Ruby Objects) that encapsulate complex business logic that doesn't fit in models/controllers. Typically one public method (call or execute). Benefits: single responsibility, testability, reusability. Use for multi-step operations, external API calls, or complex workflows.",
    "codeExample": "# app/services/user_registration_service.rb\nclass UserRegistrationService\n  def initialize(user_params)\n    @user_params = user_params\n  end\n\n  def call\n    ActiveRecord::Base.transaction do\n      create_user\n      send_welcome_email\n      create_default_settings\n      notify_admin\n      user\n    end\n  rescue => e\n    Rails.logger.error(\"Registration failed: #{e.message}\")\n    false\n  end\n\n  private\n\n  attr_reader :user_params, :user\n\n  def create_user\n    @user = User.create!(user_params)\n  end\n\n  def send_welcome_email\n    UserMailer.welcome(@user).deliver_later\n  end\n\n  def create_default_settings\n    @user.create_settings(theme: 'light', notifications: true)\n  end\n\n  def notify_admin\n    AdminNotifier.new_user(@user)\n  end\nend\n\n# Controller usage\nclass UsersController < ApplicationController\n  def create\n    service = UserRegistrationService.new(user_params)\n\n    if service.call\n      redirect_to root_path, notice: 'Welcome!'\n    else\n      render :new\n    end\n  end\nend"
  },
  {
    "id": 15,
    "category": "Engines",
    "level": "senior",
    "title": "Rails Engines",
    "question": "What are Rails Engines and how do they differ from regular gems?",
    "correctAnswer": "Engines are miniature Rails applications that can be mounted inside other Rails apps. They have their own routes, models, controllers, and views. Unlike gems, they provide full MVC functionality. Used for modular features, multi-tenancy, or extracting functionality. Can be namespaced and isolated.",
    "codeExample": "# Generate engine\nrails plugin new my_engine --mountable\n\n# lib/my_engine/engine.rb\nmodule MyEngine\n  class Engine < ::Rails::Engine\n    isolate_namespace MyEngine\n\n    config.generators do |g|\n      g.test_framework :rspec\n    end\n  end\nend\n\n# Engine routes (config/routes.rb)\nMyEngine::Engine.routes.draw do\n  resources :articles\nend\n\n# Mount in main app (config/routes.rb)\nRails.application.routes.draw do\n  mount MyEngine::Engine => \"/blog\", as: \"blog\"\nend\n\n# Engine controller\nmodule MyEngine\n  class ArticlesController < ApplicationController\n    def index\n      @articles = Article.all\n    end\n  end\nend\n\n# Access from main app\nblog.articles_path  # => \"/blog/articles\"\nMyEngine::Article.all"
  },
  {
    "id": 16,
    "category": "Engines",
    "level": "senior",
    "title": "Mounting Engines",
    "question": "How do you mount an engine in a Rails application?",
    "correctAnswer": "In config/routes.rb, use 'mount EngineModule::Engine => \"/path\"'. The engine's routes become namespaced under that path. You can customize the mount point and access engine helpers. Isolated engines have separate namespaces to avoid collisions with the host application.",
    "codeExample": "# Main app: config/routes.rb\nRails.application.routes.draw do\n  # Basic mount\n  mount MyEngine::Engine => \"/engine\"\n\n  # With custom name\n  mount MyEngine::Engine => \"/blog\", as: \"blog\"\n\n  # Multiple mounts\n  mount AdminEngine::Engine => \"/admin\"\n  mount ApiEngine::Engine => \"/api/v1\"\n\n  # Constraints\n  mount MyEngine::Engine => \"/special\",\n    constraints: { subdomain: 'engine' }\nend\n\n# Accessing engine routes in main app\nblog_url  # Helper from mounted engine\nblog.articles_path  # => \"/blog/articles\"\n\n# In views\n<%= link_to \"Blog\", blog.root_path %>\n\n# Engine initializer (lib/my_engine/engine.rb)\nmodule MyEngine\n  class Engine < ::Rails::Engine\n    isolate_namespace MyEngine\n\n    # Share main app helpers\n    config.to_prepare do\n      ApplicationController.helper(MainApp::Engine.helpers)\n    end\n  end\nend"
  },
  {
    "id": 20,
    "category": "Advanced",
    "level": "senior",
    "title": "Background Jobs",
    "question": "What is the difference between background jobs with ActiveJob and when to use them?",
    "correctAnswer": "ActiveJob is Rails' interface for background job processing, supporting multiple backends (Sidekiq, Resque, Delayed Job). Use for: long-running tasks, sending emails, API calls, data processing. Keeps requests fast by deferring work. Jobs can be queued, scheduled, retried on failure, and have priorities.",
    "codeExample": "# Generate job\nrails generate job ProcessVideo\n\n# app/jobs/process_video_job.rb\nclass ProcessVideoJob < ApplicationJob\n  queue_as :default\n  retry_on NetworkError, wait: 5.seconds, attempts: 3\n  discard_on ActiveJob::DeserializationError\n\n  def perform(video)\n    video.process!\n    video.create_thumbnails\n    VideoMailer.processing_complete(video).deliver_now\n  end\nend\n\n# Enqueue job\nProcessVideoJob.perform_later(video)\n\n# Schedule for later\nProcessVideoJob.set(wait: 1.hour).perform_later(video)\nProcessVideoJob.set(wait_until: Date.tomorrow.noon).perform_later(video)\n\n# Different queues\nclass UrgentJob < ApplicationJob\n  queue_as :urgent\nend\n\n# config/application.rb\nconfig.active_job.queue_adapter = :sidekiq\n\n# Mailer with background jobs\nclass UserMailer < ApplicationMailer\n  def welcome_email(user)\n    @user = user\n    mail(to: @user.email, subject: 'Welcome')\n  end\nend\n\n# Automatically uses ActiveJob\nUserMailer.welcome_email(@user).deliver_later\n\n# Priority and retry\nclass ImportJob < ApplicationJob\n  queue_with_priority 10\n  retry_on StandardError, wait: :exponentially_longer, attempts: 5\nend"
  }
];
